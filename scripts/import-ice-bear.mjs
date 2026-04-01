import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

const IMAGE_DIR = '/Users/alextaves/Dropbox/fergus-scrape/Ice Bear exhibition works and install'
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

async function uploadImage(localPath) {
  const stream = createReadStream(localPath)
  const filename = path.basename(localPath)
  const asset = await client.assets.upload('image', stream, { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  const files = fs.readdirSync(IMAGE_DIR).filter(f => EXTENSIONS.includes(path.extname(f).toLowerCase()))
  console.log(`Found ${files.length} images. Uploading to Sanity as 2026 works...`)

  let success = 0
  let failed = 0

  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    const fullPath = path.join(IMAGE_DIR, filename)
    const title = path.basename(filename, path.extname(filename))
    console.log(`[${i + 1}/${files.length}] ${filename}`)

    try {
      const image = await uploadImage(fullPath)
      await client.create({ _type: 'work', title, year: '2026', image })
      success++
    } catch (err) {
      console.error(`  Failed: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. ${success} imported, ${failed} failed.`)
}

run()
