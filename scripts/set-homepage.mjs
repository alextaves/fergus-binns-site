import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

// Find the asset by original filename
const asset = await client.fetch(
  `*[_type == "sanity.imageAsset" && originalFilename == "IMG_20250908_102134515.jpg"][0]{ _id }`
)

if (!asset) {
  console.error('Asset not found')
  process.exit(1)
}

console.log('Found asset:', asset._id)

// Find the work that references this asset
const work = await client.fetch(
  `*[_type == "work" && image.asset._ref == $assetId][0]{ _id, title }`,
  { assetId: asset._id }
)

if (!work) {
  console.error('Work not found')
  process.exit(1)
}

console.log('Found work:', work._id, work.title)

await client.patch(work._id).set({ isHomepage: true }).commit()
console.log('Marked as homepage hero.')
