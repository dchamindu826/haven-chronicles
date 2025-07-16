import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/client';
import './ListPage.css'; // අපි පරණ CSS file එකම පාවිච්චි කරමු

function EpisodeListPage() {
    const [episodes, setEpisodes] = useState([]);
    const [seasonTitle, setSeasonTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const { seasonNumber } = useParams(); // URL එකෙන් season අංකය ගන්නවා

    useEffect(() => {
        // Season අංකයට අදාළ episodes ටික විතරක් ගේන query එක
        const query = `*[_type == "archiveEpisode" && season->seasonNumber == $seasonNum] | order(episodeNumber asc){
            _id,
            title,
            "slug": slug.current,
            episodeNumber,
            description,
            "imageUrl": mainImage.asset->url,
            "seasonTitle": season->title // Season එකේ නම ගන්නවා
        }`;

        const params = { seasonNum: parseInt(seasonNumber) }; // URL එකෙන් එන string එක number එකක් කරනවා

        client.fetch(query, params)
            .then((data) => {
                setEpisodes(data);
                if (data.length > 0) {
                    setSeasonTitle(data[0].seasonTitle); // Season title එක state එකට දාගන්නවා
                }
                setLoading(false);
            })
            .catch(console.error);
    }, [seasonNumber]); // seasonNumber එක වෙනස්වෙන හැම පාරම මේක run වෙනවා

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
                {episodes.map((episode) => (
                    <Link to={`/the-archives/episode/${episode.slug}`} key={episode._id} className="article-card">
                        <img 
                            src={episode.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} 
                            alt={`${episode.title} Poster`} 
                            className="article-card-image" 
                        />
                        <div className="article-card-content">
                            <p className="article-card-type">Episode {episode.episodeNumber}</p>
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