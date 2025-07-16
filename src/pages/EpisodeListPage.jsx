import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/client';
import { useLanguage } from '../context/LanguageContext'; // Language Context එක import කරගන්නවා
import './ListPage.css';

function EpisodeListPage() {
    const { language } = useLanguage(); // තෝරගෙන ඉන්න භාෂාව මෙතනින් ගන්නවා
    const [episodes, setEpisodes] = useState([]);
    const [seasonTitle, setSeasonTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const { seasonNumber } = useParams();

    useEffect(() => {
        // Query එකට භාෂා දෙකේම fields ගේනවා
        const query = `*[_type == "archiveEpisode" && season->seasonNumber == $seasonNum] | order(episodeNumber asc){
            _id,
            title_en, title_si,
            "slug": slug.current,
            episodeNumber,
            description_en, description_si,
            "imageUrl": mainImage.asset->url,
            "seasonTitle_en": season->title, // Season title එකත් English වලින් ගමු (default)
            "seasonTitle_si": season->title // Season title එක දැනට දෙකම එකයි
        }`;

        const params = { seasonNum: parseInt(seasonNumber) };

        client.fetch(query, params)
            .then((data) => {
                setEpisodes(data);
                if (data.length > 0) {
                    // භාෂාව අනුව Season Title එක state එකට දාගන්නවා
                    const title = language === 'en' ? data[0].seasonTitle_en : data[0].seasonTitle_si;
                    setSeasonTitle(title || `Season ${seasonNumber}`);
                } else {
                    setSeasonTitle(`Season ${seasonNumber}`);
                }
                setLoading(false);
            })
            .catch(console.error);
    }, [seasonNumber, language]); // language එක වෙනස් වෙනකොටත් query එක ආයෙත් run වෙන්න ඕන

    if (loading) {
        return <div className="loading-screen">Loading Episodes...</div>;
    }

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1 className="list-page-title">{seasonTitle}</h1>
                <p className="list-page-subtitle">Select an episode to continue the story.</p>
            </header>

            <main className="article-grid">
                {episodes.map((episode) => {
                    // භාෂාව අනුව title සහ description තෝරගන්නවා
                    const title = language === 'en' ? episode.title_en : episode.title_si;
                    const description = language === 'en' ? episode.description_en : episode.description_si;

                    return (
                        <Link to={`/the-archives/episode/${episode.slug}`} key={episode._id} className="article-card">
                            <img 
                                src={episode.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} 
                                alt={`${title} Poster`} 
                                className="article-card-image" 
                            />
                            <div className="article-card-content">
                                <p className="article-card-type">Episode {episode.episodeNumber}</p>
                                <h4 className="article-card-title">{title}</h4>
                                <p className="article-card-description">{description}</p>
                            </div>
                        </Link>
                    );
                })}
            </main>
        </div>
    );
}

export default EpisodeListPage;