// src/pages/EpisodeListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/client';
import { useLanguage } from '../context/LanguageContext';
import './ListPage.css';

function EpisodeListPage() {
    const { language } = useLanguage();
    const [episodes, setEpisodes] = useState([]);
    const [seasonTitle, setSeasonTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const { seasonNumber } = useParams();

    useEffect(() => {
        setLoading(true);

        // Query එක coalesce පාවිච්චි කරලා තවත් සරල කරා
        const query = `*[_type == "archiveEpisode" && season->seasonNumber == $seasonNum] | order(episodeNumber asc){
            _id,
            "title": coalesce(title_${language}, title_en, title),
            "slug": slug.current,
            episodeNumber,
            "description": coalesce(description_${language}, description_en, description),
            "imageUrl": mainImage.asset->url,
            "seasonTitle": coalesce(season->title_${language}, season->title_en, season->title)
        }`;

        const params = { seasonNum: parseInt(seasonNumber) };

        client.fetch(query, params)
            .then((data) => {
                setEpisodes(data);
                if (data.length > 0) {
                    // Query එකෙන්ම නිවැරදි භාෂාවෙන් title එක එන නිසා, මෙතන logic එක සරල වෙනවා
                    setSeasonTitle(data[0].seasonTitle || (language === 'si' ? `වාරය ${seasonNumber}`: `Season ${seasonNumber}`));
                } else {
                    setSeasonTitle(language === 'si' ? `වාරය ${seasonNumber}`: `Season ${seasonNumber}`);
                }
                setLoading(false);
            })
            .catch(console.error);
    }, [seasonNumber, language]);

    if (loading) {
        return <div className="loading-screen">Loading Episodes...</div>;
    }

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1 className="list-page-title">{seasonTitle}</h1>
                {/* මේ text එකත් language එකට අනුව වෙනස් වෙන්න හැදුවා */}
                <p className="list-page-subtitle">
                    {language === 'si' ? 'කතාව ඉදිරියට ගෙන යාමට කථාංගයක් තෝරන්න.' : 'Select an episode to continue the story.'}
                </p>
            </header>

            <main className="article-grid">
                {episodes.map((episode) => (
                    // දැන් මෙතන ආයෙත් title, description තෝරන්න ඕනේ නෑ, query එකෙන්ම එන්නේ නිවැරදි එක
                    <Link to={`/the-archives/episode/${episode.slug}`} key={episode._id} className="article-card">
                        <img 
                            src={episode.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} 
                            alt={`${episode.title} Poster`} 
                            className="article-card-image" 
                        />
                        <div className="article-card-content">
                             {/* 'Episode' කියන වචනෙත් භාෂාවට අනුව වෙනස් වෙන්න හැදුවා */}
                            <p className="article-card-type">
                                {language === 'si' ? 'කථාංගය' : 'Episode'} {episode.episodeNumber}
                            </p>
                            <h4 className="article-card-title">{episode.title}</h4>
                            <p className="article-card-description">{episode.description}</p>
                        </div>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default EpisodeListPage;