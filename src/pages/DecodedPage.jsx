// src/pages/DecodedPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/client';
import './ListPage.css'; // අපි මේ CSS file එක ඊළඟට හදනවා

function DecodedPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const query = `*[_type == "decodedPost"] | order(publishedAt desc){
          title,
          "slug": slug.current,
          description,
          "imageUrl": mainImage.asset->url
        }`;

        client.fetch(query).then((data) => {
            setPosts(data);
        });
    }, []);

    return (
        <div className="list-page-container">
            <header className="list-page-header">
                <h1 className="list-page-title">DECODED</h1>
                <p className="list-page-subtitle">Uncovering the hidden truths and classified files.</p>
            </header>

            <div className="article-grid">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Link to={`/decoded/${post.slug}`} key={post.slug} className="article-card">
                            <img src={post.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={post.title} className="article-card-image" />
                            <div className="article-card-content">
                                <h4 className="article-card-title">{post.title}</h4>
                                <p className="article-card-description">{post.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Loading articles...</p>
                )}
            </div>
        </div>
    );
}

export default DecodedPage;