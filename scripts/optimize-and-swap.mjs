import { createClient } from '@sanity/client'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs'
import os from 'os'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

const IMAGE_DIR = '/Users/alextaves/Dropbox/fergus-scrape/Ice Bear exhibition works and install'
const TMP_DIR = path.join(os.tmpdir(), 'fergus-optimized')
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const MAX_PX = 2400
const QUALITY = 85

fs.mkdirSync(TMP_DIR, { recursive: true })

async function optimizeImage(srcPath, destPath) {
  const meta = await sharp(srcPath).metadata()
  const isLandscape = (meta.width ?? 0) >= (meta.height ?? 0)
  const resize = isLandscape
    ? { width: Math.min(meta.width ?? MAX_PX, MAX_PX) }
    : { height: Math.min(meta.height ?? MAX_PX, MAX_PX) }

  await sharp(srcPath)
    .resize(resize)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(destPath)

  const srcSize = fs.statSync(srcPath).size
  const destSize = fs.statSync(destPath).size
  return { srcSize, destSize, width: meta.width, height: meta.height }
}

async function run() {
  const files = fs.readdirSync(IMAGE_DIR).filter(f =>
    EXTENSIONS.includes(path.extname(f).toLowerCase())
  )

  console.log(`Processing ${files.length} images...\n`)

  for (const filename of files) {
    const srcPath = path.join(IMAGE_DIR, filename)
    const destPath = path.join(TMP_DIR, path.basename(filename, path.extname(filename)) + '.jpg')

    process.stdout.write(`${filename}\n  Optimizing... `)
    const { srcSize, destSize, width, height } = await optimizeImage(srcPath, destPath)
    console.log(`${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(destSize / 1024 / 1024).toFixed(1)}MB (${width}×${height} → max ${MAX_PX}px)`)

    // Find existing asset by original filename (try both .jpg and .jpeg variants)
    const originalFilename = filename
    const asset = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename == $name][0]{_id}`,
      { name: originalFilename }
    )

    // Upload optimized image
    process.stdout.write('  Uploading... ')
    const newAsset = await client.assets.upload('image', createReadStream(destPath), {
      filename: path.basename(destPath),
    })
    console.log(`uploaded ${newAsset._id}`)

    if (asset) {
      // Find work referencing old asset and update it
      const work = await client.fetch(
        `*[_type == "work" && image.asset._ref == $ref][0]{_id}`,
        { ref: asset._id }
      )
      if (work) {
        await client.patch(work._id)
          .set({ image: { _type: 'image', asset: { _type: 'reference', _ref: newAsset._id } } })
          .commit()
        console.log(`  Updated work ${work._id}`)

        // Delete old asset
        await client.delete(asset._id)
        console.log(`  Deleted old asset ${asset._id}`)
      } else {
        console.log(`  No work found referencing old asset`)
      }
    } else {
      console.log(`  No existing asset found for ${filename} — skipping swap`)
    }

    console.log()
  }

  console.log('All done.')
}

run().catch(err => { console.error(err); process.exit(1) })
