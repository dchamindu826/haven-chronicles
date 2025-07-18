// sanity/schemaTypes/decodedPost.js
export default {
  name: 'decodedPost',
  title: 'DECODED Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'author', title: 'Author', type: 'reference', to: {type: 'author'} },
    { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'blockContent' },
  ],
}