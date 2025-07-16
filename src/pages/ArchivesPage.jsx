import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/client';
import './ListPage.css'; // අපි ListPage.css එකම පාවිච්චි කරමු

function ArchivesPage() {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // දැන් අපි episodes වෙනුවට seasons තමයි ගේන්නේ
        const query = `*[_type == "season"] | order(seasonNumber asc){
            _id,
            title,
            seasonNumber,
            description,
            "posterUrl": poster.asset->url
        }`;

        client.fetch(query)
            .then((data) => {
                setSeasons(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) {
        return <div className="loading-screen">Loading Seasons...</div>;
    }

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1 className="list-page-title">The Archives</h1>
                <p className="list-page-subtitle">Select a season to begin.</p>
            </header>

            <main className="article-grid">
                {seasons.map((season) => (
                    // හැම season එකකටම link එකක් එක්ක card එකක් හදනවා
                    <Link to={`/the-archives/season/${season.seasonNumber}`} key={season._id} className="article-card">
                        <img 
                            src={season.posterUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Poster'} 
                            alt={`${season.title} Poster`} 
                            className="article-card-image" 
                        />
                        <div className="article-card-content">
                            <p className="article-card-type">{season.title}</p>
                            <h4 className="article-card-title">Season {season.seasonNumber}</h4>
                            <p className="article-card-description">{season.description}</p>
                        </div>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default ArchivesPage;