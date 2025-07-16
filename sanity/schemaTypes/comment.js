// sanity/schemaTypes/comment.js
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    // This is the new rating field
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'decodedPost' }, { type: 'archiveEpisode' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
    },
    prepare({ name, comment, post }) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      }
    },
  },
}