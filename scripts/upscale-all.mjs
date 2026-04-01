import { createClient } from '@sanity/client'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import os from 'os'
import https from 'https'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

const TMP_DIR = path.join(os.tmpdir(), 'fergus-upscale')
const MAX_PX = 2400
const QUALITY = 85

fs.mkdirSync(TMP_DIR, { recursive: true })

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err) })
  })
}

async function processImage(srcPath, destPath, width, height) {
  const longest = Math.max(width, height)
  const isLandscape = width >= height
  const resize = longest >= MAX_PX
    ? (isLandscape ? { width: MAX_PX } : { height: MAX_PX })
    : (isLandscape ? { width: MAX_PX } : { height: MAX_PX }) // upscale

  await sharp(srcPath)
    .resize({ ...resize, withoutEnlargement: false })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(destPath)
}

async function run() {
  // Fetch all works not in 2026, with their asset info
  const works = await client.fetch(`
    *[_type == "work" && year != "2026" && defined(image.asset)] {
      _id, year, title,
      "assetId": image.asset._ref,
      "assetUrl": image.asset->url,
      "filename": image.asset->originalFilename,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    } | order(year asc)
  `)

  // Deduplicate by assetId — skip works sharing an asset we've already processed
  const processedAssets = new Set()
  const toProcess = []
  for (const w of works) {
    if (!w.assetUrl) continue
    if (processedAssets.has(w.assetId)) {
      console.log(`  SKIP duplicate asset: ${w.filename} (year ${w.year})`)
      continue
    }
    processedAssets.add(w.assetId)
    toProcess.push(w)
  }

  console.log(`\n${toProcess.length} unique images to upscale across ${new Set(toProcess.map(w => w.year)).size} years\n`)

  let success = 0, failed = 0

  for (let i = 0; i < toProcess.length; i++) {
    const w = toProcess[i]
    const ext = path.extname(w.filename || '.jpg') || '.jpg'
    const tmpSrc = path.join(TMP_DIR, `src_${i}${ext}`)
    const tmpDest = path.join(TMP_DIR, `dest_${i}.jpg`)

    process.stdout.write(`[${i + 1}/${toProcess.length}] ${w.year} — ${w.filename} (${w.width}x${w.height})\n`)

    try {
      process.stdout.write('  Downloading... ')
      await download(w.assetUrl, tmpSrc)
      console.log('done')

      process.stdout.write('  Upscaling... ')
      await processImage(tmpSrc, tmpDest, w.width, w.height)
      const newSize = (fs.statSync(tmpDest).size / 1024 / 1024).toFixed(1)
      const meta = await sharp(tmpDest).metadata()
      console.log(`${meta.width}x${meta.height} ${newSize}MB`)

      process.stdout.write('  Uploading... ')
      const newAsset = await client.assets.upload('image', fs.createReadStream(tmpDest), {
        filename: path.basename(w.filename || `image_${i}.jpg`, ext) + '.jpg',
      })
      console.log(newAsset._id)

      // Update all works referencing this old asset
      const affected = await client.fetch(
        `*[_type == "work" && image.asset._ref == $ref]{_id}`,
        { ref: w.assetId }
      )
      for (const a of affected) {
        await client.patch(a._id)
          .set({ image: { _type: 'image', asset: { _type: 'reference', _ref: newAsset._id } } })
          .commit()
      }
      console.log(`  Updated ${affected.length} work(s)`)

      await client.delete(w.assetId)
      console.log(`  Deleted old asset`)

      // Clean up tmp files
      fs.unlinkSync(tmpSrc)
      fs.unlinkSync(tmpDest)

      success++
    } catch (err) {
      console.error(`  FAILED: ${err.message}`)
      failed++
    }
    console.log()
  }

  console.log(`\nDone. ${success} upscaled, ${failed} failed.`)
}

run().catch(err => { console.error(err); process.exit(1) })
