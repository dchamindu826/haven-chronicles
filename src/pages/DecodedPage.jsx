// src/pages/DecodedPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/client';
import { useLanguage } from '../context/LanguageContext'; // <--- අපේ custom hook එක import කරනවා
import './ListPage.css';

function DecodedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // <--- loading state එකක් එකතු කරා
    const { language } = useLanguage(); // <--- context එකෙන් language එක ගන්නවා

    useEffect(() => {
        setLoading(true); // <--- හැම data fetch එකකටම කලින් loading පටන් ගන්නවා
        
        // Sanity query එක භාෂාවට අනුව වෙනස් කරනවා
        const query = `*[_type == "decodedPost"] | order(publishedAt desc){
            "title": coalesce(title_${language}, title_en, title),
            "slug": slug.current,
            "description": coalesce(description_${language}, description_en, description),
            "imageUrl": mainImage.asset->url
        }`;

        client.fetch(query).then((data) => {
            setPosts(data);
            setLoading(false); // <--- data ආවම loading ඉවර කරනවා
        });
    }, [language]); // <--- භාෂාව මාරු කරද්දී data ආයෙත් load වෙන්න

    // loading state එක මෙතන පාවිච්චි කරනවා
    if (loading) {
        return <div className="loading-screen">Loading Articles...</div>;
    }

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                {/* Header එක භාෂාවට අනුව වෙනස් වෙනවා */}
                <h1 className="list-page-title">{language === 'si' ? 'විසඳන ලදී' : 'DECODED'}</h1>
                <p className="list-page-subtitle">{language === 'si' ? 'සැඟවුණු සත්‍ය සහ වර්ගීකෘත ගොනු හෙළිදරව් කිරීම.' : 'Uncovering the hidden truths and classified files.'}</p>
            </header>

            <div className="article-grid">
                {posts.map((post) => (
                    <Link to={`/decoded/${post.slug}`} key={post.slug} className="article-card">
                        <img src={post.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={post.title} className="article-card-image" />
                        <div className="article-card-content">
                            {/* Card එකේ content එකත් භාෂාවට අනුව වෙනස් වෙනවා */}
                            <h4 className="article-card-title">{post.title}</h4>
                            <p className="article-card-description">{post.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DecodedPage;