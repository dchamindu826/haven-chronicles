// sanity/schemaTypes/index.js
import blockContent from './blockContent'
import category from './category'
import author from './author'
import archiveEpisode from './archiveEpisode'
import decodedPost from './decodedPost'
import comment from './comment' // <-- අලුතෙන් import කරගන්නවා
import season from './season'

// අලුත් comment schema එක list එකට එකතු කරනවා
export const schemaTypes = [ season, decodedPost, archiveEpisode, author, category, blockContent, comment]