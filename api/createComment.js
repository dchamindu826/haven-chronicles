// api/createComment.js
import { createClient } from '@sanity/client';

// Vite project එකක server-side code එකේදී, .env variables ගන්න ඕන මේ විදිහට
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-07-16',
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { _id, name, comment } = JSON.parse(req.body);

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      comment,
      approved: false,
    });

    return res.status(200).json({ message: 'Comment submitted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
}