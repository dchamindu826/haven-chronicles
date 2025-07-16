// sanity/schemaTypes/archiveEpisode.js
export default {
    name: 'archiveEpisode',
    title: 'Archive Episode',
    type: 'document',
    fields: [
        // අලුත් Season field එක මෙතනට, fields array එක ඇතුලට දාන්න ඕන
        {
            name: 'season',
            title: 'Season',
            description: 'Which season does this episode belong to?',
            type: 'reference',
            to: [{ type: 'season' }],
            validation: Rule => Rule.required(),
        },
        {
            name: 'episodeNumber',
            title: 'Episode Number',
            description: 'The number of this episode within the season (e.g., 1, 2, 3...)',
            type: 'number',
            validation: Rule => Rule.required(),
        },
        {
            name: 'title',
            title: 'Episode Title',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }], // Best practice is an array
        },
        {
            name: 'mainImage',
            title: 'Episode Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Short Description',
            description: 'A short, one or two-sentence summary for the episode list.',
            type: 'text',
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required(),
        },
        {
            name: 'body',
            title: 'Episode Content',
            type: 'blockContent',
        },
    ],

    // Sanity Studio එකේ ලේසියෙන් බලාගන්න Preview එකක්
    preview: {
        select: {
            title: 'title',
            episode: 'episodeNumber',
            season: 'season.title',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, episode, season, media } = selection;
            return {
                title: `${title} (E${episode || '?'})`,
                subtitle: season || 'No season assigned',
                media: media,
            };
        },
    },

    // sanity/schemaTypes/archiveEpisode.js

  // ... (name, title, type වගේ උඩ දේවල් එහෙමම තියෙයි) ...
  fieldsets: [
    {name: 'english_content', title: 'English Content'},
    {name: 'sinhala_content', title: 'Sinhala Content'}
  ],
  fields: [
    {
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{ type: 'season' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    // --- English Fields ---
    {
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      fieldset: 'english_content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description_en',
      title: 'Short Description (English)',
      type: 'text',
      fieldset: 'english_content',
    },
    {
      name: 'body_en',
      title: 'Episode Content (English)',
      type: 'blockContent',
      fieldset: 'english_content',
    },
    // --- Sinhala Fields ---
    {
      name: 'title_si',
      title: 'Title (Sinhala)',
      type: 'string',
      fieldset: 'sinhala_content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description_si',
      title: 'Short Description (Sinhala)',
      type: 'text',
      fieldset: 'sinhala_content',
    },
    {
      name: 'body_si',
      title: 'Episode Content (Sinhala)',
      type: 'blockContent',
      fieldset: 'sinhala_content',
    },
    // --- General Fields ---
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title_en', // English title එකෙන් slug එක හදමු
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Episode Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
  ],
  // ... (preview වගේ යට දේවල් එහෙමම තියෙයි) ...
};