import { defineField, defineType } from 'sanity'

export const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'pageUrl',
      title: 'Original Page URL',
      type: 'url',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order within the same year. Lower numbers appear first.',
    }),
    defineField({
      name: 'isHomepage',
      title: 'Homepage Hero',
      type: 'boolean',
      description: 'Show this work as the homepage hero image (desktop)',
    }),
    defineField({
      name: 'isMobileHomepage',
      title: 'Homepage Hero (Mobile & Tablet)',
      type: 'boolean',
      description: 'Show this work as the homepage hero image on mobile and tablet',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'image',
    },
  },
})
