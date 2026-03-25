import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'fergus-binns',
  title: 'Fergus Binns',

  projectId: 'ijppbmn9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Fergus Binns')
          .items([
            // All works flat list
            S.listItem()
              .title('All Works')
              .child(
                S.documentList()
                  .title('All Works')
                  .filter('_type == "work"')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),

            S.divider(),

            // Works grouped by year
            S.listItem()
              .title('Works by Year')
              .child(
                S.list()
                  .title('Select a Year')
                  .items(
                    ['2026','2025','2024','2023','2022','2021','2020','2019','2018','2017',
                     '2016','2015','2014','2013','2012','2011','2010','2009','2008','2007',
                     '2006','2005','2004','2003','2002'].map(year =>
                      S.listItem()
                        .title(year)
                        .child(
                          S.documentList()
                            .title(`Works — ${year}`)
                            .filter('_type == "work" && year == $year')
                            .params({ year })
                            .defaultOrdering([{ field: 'title', direction: 'asc' }])
                        )
                    )
                  )
              ),

            S.divider(),

            // Info / CV
            S.listItem()
              .title('Info / CV')
              .child(S.document().schemaType('cv').documentId('cv-singleton')),

            S.divider(),

            // Quick links
            S.listItem()
              .title('Add New Work')
              .child(S.document().schemaType('work').documentId('new-work-' + Date.now())),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
