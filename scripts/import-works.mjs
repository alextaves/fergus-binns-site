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

const works = JSON.parse(fs.readFileSync('/Users/alextaves/fergus-scrape/works.json', 'utf8'))

async function uploadImage(localPath) {
  if (!localPath || !fs.existsSync(localPath)) return null
  const stream = createReadStream(localPath)
  const filename = path.basename(localPath)
  try {
    const asset = await client.assets.upload('image', stream, { filename })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.error(`  Image upload failed: ${filename} — ${err.message}`)
    return null
  }
}

async function run() {
  console.log(`Importing ${works.length} works into Sanity...`)
  let success = 0
  let failed = 0

  for (let i = 0; i < works.length; i++) {
    const work = works[i]
    console.log(`[${i + 1}/${works.length}] ${work.title || '(untitled)'} ${work.year}`)

    const image = await uploadImage(work.local_path)

    const doc = {
      _type: 'work',
      title: work.title || '',
      year: work.year || '',
      medium: work.medium || '',
      dimensions: work.dimensions || '',
      pageUrl: work.page_url || '',
      ...(image ? { image } : {}),
    }

    try {
      await client.create(doc)
      success++
    } catch (err) {
      console.error(`  Failed to create document: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. ${success} imported, ${failed} failed.`)
}

run()
