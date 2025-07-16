// src/pages/ArchivesPage.jsx

import React, { useState, useEffect, useContext } from 'react'; // <--- useContext එක import කරා
import { Link } from 'react-router-dom';
import { client } from '../lib/client';
import { useLanguage } from '../context/LanguageContext'; // <--- අපේ custom hook එක import කරා
import './ListPage.css'; 

function ArchivesPage() {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage(); // <--- මෙතනදි අපි හදපු context එකෙන් language එක ගන්නවා

    useEffect(() => {
        // Sanity එකෙන් data ගේන query එක භාෂාවට අනුව වෙනස් වෙන්න හදමු
        // ඔයාගේ Sanity schema එකේ title, description වලට _si සහ _en version තියෙන්න ඕනේ
        const query = `*[_type == "season"] | order(seasonNumber asc){
            _id,
            seasonNumber,
            "title": coalesce(title_${language}, title_en, title),
            "description": coalesce(description_${language}, description_en, description),
            "posterUrl": poster.asset->url
        }`;

        client.fetch(query)
            .then((data) => {
                setSeasons(data);
                setLoading(false);
            })
            .catch(console.error);
    }, [language]); // <--- මෙතනට language එකත් දානවා, භාෂාව මාරු කරද්දී data ආයෙත් load වෙන්න

    if (loading) {
        return <div className="loading-screen">Loading Seasons...</div>;
    }

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                {/* මෙතන text එක language එකට අනුව වෙනස් වෙනවා */}
                <h1 className="list-page-title">{language === 'si' ? 'ලේඛනාගාරය' : 'The Archives'}</h1>
                <p className="list-page-subtitle">{language === 'si' ? 'කතාවක් තෝරා ආරම්භ කරන්න.' : 'Select a Story to begin.'}</p>
            </header>

            <main className="article-grid">
                {seasons.map((season) => (
                    <Link to={`/the-archives/season/${season.seasonNumber}`} key={season._id} className="article-card">
                        <img 
                            src={season.posterUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Poster'} 
                            alt={`${season.title} Poster`} 
                            className="article-card-image" 
                        />
                        <div className="article-card-content">
                            {/* මෙතන season title එකත් Sanity එකෙන් එන විදිහට භාෂාවට අනුව වෙනස් වෙනවා */}
                            <p className="article-card-type">{season.title}</p>
                            <h4 className="article-card-title">{language === 'si' ? `වාරය ${season.seasonNumber}` : `Season ${season.seasonNumber}`}</h4>
                            <p className="article-card-description">{season.description}</p>
                        </div>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default ArchivesPage;