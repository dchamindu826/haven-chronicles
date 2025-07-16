// src/pages/ArchivesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/client';
import './ListPage.css'; // අපි කලින් හදපු CSS file එකම පාවිච්චි කරනවා

function ArchivesPage() {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        // Query එකේ _type එක විතරයි වෙනස් වෙන්නේ
        const query = `*[_type == "archiveEpisode"] | order(publishedAt desc){
          title,
          "slug": slug.current,
          description,
          "imageUrl": mainImage.asset->url,
          seasonNumber,
          episodeNumber
        }`;

        client.fetch(query).then((data) => {
            setEpisodes(data);
        });
    }, []);

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1 className="list-page-title" style={{color: '#ff3b30'}}>THE ARCHIVES</h1>
                <p className="list-page-subtitle">The stories of those who found Haven.</p>
            </header>

            <div className="article-grid">
                {episodes.length > 0 ? (
                    episodes.map((episode) => (
                        <Link to={`/the-archives/${episode.slug}`} key={episode.slug} className="article-card archives-list-card">
                            <img src={episode.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={episode.title} className="article-card-image" />
                            <div className="article-card-content">
                                <p className="article-card-type" style={{color: '#ff3b30'}}>
                                    SEASON {episode.seasonNumber} | EPISODE {episode.episodeNumber}
                                </p>
                                <h4 className="article-card-title">{episode.title}</h4>
                                <p className="article-card-description">{episode.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Loading episodes...</p>
                )}
            </div>
        </div>
    );
}

export default ArchivesPage;