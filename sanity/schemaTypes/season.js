// sanity/schemaTypes/season.js
export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title', // උදා: "Season 01"
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'seasonNumber',
      title: 'Season Number', // උදා: 1
      type: 'number',
      validation: Rule => Rule.required().integer().positive(),
    },
    {
      name: 'poster',
      title: 'Poster Image',
      description: 'A poster image for the season (e.g., 9:16 aspect ratio)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      description: 'A short summary of what this season is about',
      type: 'text',
    },
  ],
  orderings: [
    {
      title: 'Season Number, Ascending',
      name: 'seasonNumberAsc',
      by: [{field: 'seasonNumber', direction: 'asc'}]
    }
  ]
}