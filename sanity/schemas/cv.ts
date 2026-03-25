import { defineType, defineField, defineArrayMember } from 'sanity'

const cvEntry = defineArrayMember({
  type: 'object',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'text', title: 'Description', type: 'string' }),
  ],
  preview: {
    select: { title: 'year', subtitle: 'text' },
  },
})

export const cv = defineType({
  name: 'cv',
  title: 'Info / CV',
  type: 'document',
  fields: [
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [cvEntry],
    }),
    defineField({
      name: 'soloExhibitions',
      title: 'Solo Exhibitions',
      type: 'array',
      of: [cvEntry],
    }),
    defineField({
      name: 'groupExhibitions',
      title: 'Group Exhibitions',
      type: 'array',
      of: [cvEntry],
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [cvEntry],
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})
