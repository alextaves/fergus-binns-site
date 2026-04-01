import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

const works = await client.fetch(`*[_type == "work" && year == "2026"]{_id, title}`)
console.log(`Found ${works.length} works for 2026`)

for (const work of works) {
  await client.patch(work._id).set({ title: 'Untitled', medium: 'mixed media' }).commit()
  console.log(`Updated: ${work._id}`)
}

console.log('Done.')
