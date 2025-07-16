import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import { client } from '../lib/client';
import AdBanner from '../components/AdBanner'; // AdBanner component එක import කරගන්නවා

// Reusable Star Display Component for Cards
const StarsDisplay = ({ rating }) => {
    if (!rating) return null;
    return (
        <div className="stars-display-card">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={i < rating ? 'star-filled-card' : 'star-empty-card'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            ))}
            <span className="rating-text">{rating.toFixed(1)}</span>
        </div>
    );
};

// SVG Icons
const FileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg> );
const BookIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg> );

function Homepage() {
    const [latestArticles, setLatestArticles] = useState([]);

    // **මෙන්න ඔයා දීපු Adsterra Ad Code එක**
    const bannerAdCode = `
        <script type="text/javascript">
            atOptions = {
                'key' : '77d5b21663e3074b7561885d0bbeb480',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/77d5b21663e3074b7561885d0bbeb480/invoke.js"></script>
    `;

    useEffect(() => {
        const query = `*[_type == "decodedPost" || _type == "archiveEpisode"] | order(publishedAt desc)[0...3]{
          title,
          "slug": slug.current,
          "type": _type,
          description,
          "imageUrl": mainImage.asset->url,
          "avgRating": round(math::avg(*[_type == "comment" && references(^._id) && approved == true].rating), 1)
        }`;

        client.fetch(query).then((data) => {
            setLatestArticles(data);
        });
    }, []);

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1 className="main-title">H<span className="title-accent-green">Λ</span>VΣN</h1>
                <p className="subtitle">CHRONICLES</p>
            </header>
            <main className="homepage-main-sections">
                <Link to="/decoded" className="interactive-card decoded-card">
                    <FileIcon />
                    <h2 className="card-title">DECODED</h2>
                    <p className="card-description">Uncover the hidden truths, classified files, and unexplained phenomena.</p>
                </Link>
                <Link to="/the-archives" className="interactive-card archives-card">
                    <BookIcon />
                    <h2 className="card-title">THE ARCHIVES</h2>
                    <p className="card-description">Enter the narrative. Follow the stories of those who found Haven.</p>
                </Link>
            </main>

            {/* Ad Banner එක පෙන්වන තැන */}
            <section className="ad-wrapper">
                <AdBanner adCode={bannerAdCode} />
            </section>

            <section className="latest-transmissions">
                <h3 className="section-title">LATEST TRANSMISSIONS</h3>
                <div className="article-grid">
                    {latestArticles.length > 0 ? (
                        latestArticles.map((article, index) => {
                            const linkPath = article.type === 'archiveEpisode' ? `/the-archives/${article.slug}` : `/decoded/${article.slug}`;
                            return (
                                <Link to={linkPath} key={article.slug || index} className="article-card">
                                    <img src={article.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={article.title} className="article-card-image" />
                                    <div className="article-card-content">
                                        <div className="card-top-row">
                                            <p className="article-card-type" style={{ color: article.type === 'archiveEpisode' ? '#ff3b30' : '#00ff99' }}>
                                                {article.type === 'archiveEpisode' ? 'ARCHIVE' : 'DECODED'}
                                            </p>
                                            <StarsDisplay rating={article.avgRating} />
                                        </div>
                                        <h4 className="article-card-title">{article.title}</h4>
                                        <p className="article-card-description">{article.description}</p>
                                    </div>
                                </Link>
                            )
                        })
                    ) : ( <p>Loading transmissions...</p> )}
                </div>
            </section>
            <footer className="homepage-footer">
                <p>&copy; 2025 Haven Chronicles. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default Homepage;
