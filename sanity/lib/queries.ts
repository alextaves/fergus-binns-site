import { client } from './client'

export async function getAllWorks() {
  return client.fetch(
    `*[_type == "work"] | order(year desc, _createdAt asc) {
      _id, title, year, medium, dimensions, image, pageUrl
    }`
  )
}

export async function getYears(): Promise<string[]> {
  const years = await client.fetch(
    `array::unique(*[_type == "work"].year) | order(@ desc)`
  )
  return years.filter(Boolean)
}

export async function getHomepageWork() {
  return client.fetch(
    `*[_type == "work" && isHomepage == true][0] { _id, title, medium, dimensions, year, image }`
  )
}

export async function getMobileHomepageWork() {
  return client.fetch(
    `*[_type == "work" && isMobileHomepage == true][0] { _id, title, medium, dimensions, image }`
  )
}

export async function getHomepageSettings() {
  return client.fetch(
    `*[_type == "homepage" && _id == "homepage-singleton"][0] {
      landscapeWork->{ _id, title, year, medium, dimensions, image },
      portraitWork->{ _id, title, year, medium, dimensions, image }
    }`
  )
}

export async function getCV() {
  return client.fetch(
    `*[_type == "cv" && _id == "cv-singleton"][0] {
      bio, education, soloExhibitions, groupExhibitions, awards, collections
    }`
  )
}
