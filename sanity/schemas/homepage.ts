import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'landscapeWork',
      title: 'Landscape Image',
      type: 'reference',
      to: [{ type: 'work' }],
      description: 'Optimum for desktop. Choose a landscape-oriented painting.',
    }),
    defineField({
      name: 'portraitWork',
      title: 'Portrait Image',
      type: 'reference',
      to: [{ type: 'work' }],
      description: 'Optimum for tablet and mobile. Choose a portrait-oriented painting.',
    }),
  ],
})
