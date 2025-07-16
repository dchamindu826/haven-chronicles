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
};