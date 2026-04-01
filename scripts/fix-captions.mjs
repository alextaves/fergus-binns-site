import { createClient } from '@sanity/client'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import fs from 'fs'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQisEBOcYqLXUT8ahyaVb4rsDGZ8kGeqPfRL9BV8egW930FSkYKWV05ocOTxy8sHyUJDG811L1Ovjd32TbauNkPWKtLUDsYlGsNzdQtPFjhxiEQsSTi2B6FrJ2weWiR6sIwJmbPK0yNBXfN81BVsI1h1R5KLS5nTEtjoxlifMDL13DjWuqm',
  useCdn: false,
})

const WORKS_JSON = '/Users/alextaves/Dropbox/fergus-scrape/works.json'
const works = JSON.parse(fs.readFileSync(WORKS_JSON, 'utf8'))
const missing = works.filter(w => !w.title)

function parseCaption(html) {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  // Primary: .entry-caption div (most pages use this)
  const captionEl = doc.querySelector('.entry-caption')
  if (captionEl) {
    const raw = captionEl.textContent.trim()
    if (raw) {
      // Format: "Title Year, medium dimensions" — split on first comma
      const commaIdx = raw.indexOf(',')
      if (commaIdx > -1) {
        const titlePart = raw.slice(0, commaIdx).trim()
        const rest = raw.slice(commaIdx + 1).trim()
        // Extract dimensions from rest
        const dimMatch = rest.match(/(\d+\s*[xX×]\s*\d+\s*(?:cm|mm|m)?)/i)
        const dimensions = dimMatch ? dimMatch[1].trim() : ''
        const medium = dimensions ? rest.replace(dimMatch[0], '').trim().replace(/\s+$/, '') : rest
        return { title: titlePart, medium, dimensions }
      }
      // No comma — whole thing is the title
      return { title: raw, medium: '', dimensions: '' }
    }
  }

  // Fallback: <p> sibling of .entry-attachment
  const attachment = doc.querySelector('.entry-attachment')
  if (attachment) {
    let node = attachment.nextSibling
    while (node) {
      if (node.nodeName === 'P') {
        const text = node.textContent.trim()
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
        if (lines.length) {
          const title = lines[0]
          let medium = '', dimensions = ''
          for (const line of lines.slice(1)) {
            if (/\d+\s*[xX×]\s*\d+/.test(line)) dimensions = line
            else if (!medium) medium = line
          }
          return { title, medium, dimensions }
        }
        break
      }
      node = node.nextSibling
    }
  }

  return { title: '', medium: '', dimensions: '' }
}

async function scrape(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

async function run() {
  console.log(`Fixing captions for ${missing.length} works...`)

  // Get all Sanity docs with no title so we can match by pageUrl
  const docs = await client.fetch(`*[_type == "work" && (title == "" || !defined(title))] { _id, pageUrl }`)
  const docMap = {}
  for (const d of docs) {
    if (d.pageUrl) docMap[d.pageUrl] = d._id
  }

  let fixed = 0, skipped = 0, failed = 0

  for (let i = 0; i < missing.length; i++) {
    const work = missing[i]
    console.log(`[${i + 1}/${missing.length}] ${work.page_url}`)

    const docId = docMap[work.page_url]
    if (!docId) { console.log('  No Sanity doc found'); skipped++; continue }

    try {
      const html = await scrape(work.page_url)
      const caption = parseCaption(html)
      console.log(`  → "${caption.title}" / ${caption.medium} / ${caption.dimensions}`)

      if (caption.title || caption.medium || caption.dimensions) {
        await client.patch(docId).set({
          title: caption.title,
          medium: caption.medium,
          dimensions: caption.dimensions,
        }).commit()
        fixed++
      } else {
        console.log('  No caption found on page')
        skipped++
      }

      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      console.error(`  Error: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. ${fixed} fixed, ${skipped} skipped, ${failed} failed.`)
}

run()
