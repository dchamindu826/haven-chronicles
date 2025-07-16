import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/client';
import { PortableText } from '@portabletext/react';
import { useLanguage } from '../context/LanguageContext'; // Language Context එක import කරගන්නවා
import './SinglePostPage.css';

// Star component for displaying ratings
const StarsDisplay = ({ rating }) => (
    <div className="stars-display">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={i < rating ? 'star-filled' : 'star-empty'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        ))}
    </div>
);

function SinglePostPage() {
    const { language } = useLanguage(); // තෝරගෙන ඉන්න භාෂාව මෙතනින් ගන්නවා
    const [postData, setPostData] = useState(null);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ name: '', comment: '', rating: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        // භාෂා දෙකටම අදාළ fields මෙතනින් ගේනවා
        const query = `*[_type in ["decodedPost", "archiveEpisode"] && slug.current == $slug][0]{
            _id,
            "type": _type,
            title_en, title_si,
            "imageUrl": mainImage.asset->url,
            body_en, body_si,
            publishedAt,
            "previousPost": *[_type == ^._type && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{ "slug": slug.current, "type": _type },
            "nextPost": *[_type == ^._type && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{ "slug": slug.current, "type": _type }
        }`;
        
        const commentsQuery = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt desc)`;

        client.fetch(query, { slug }).then((data) => {
            setPostData(data);
            if (data?._id) {
                client.fetch(commentsQuery, { postId: data._id }).then((commentsData) => {
                    setComments(commentsData);
                });
            }
        });
    }, [slug]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleRating = (rate) => {
        setFormData({ ...formData, rating: rate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.comment || formData.rating === 0) {
            alert('Please fill out all fields and provide a rating.');
            return;
        }
        setIsSubmitting(true);
        
        const newComment = {
            _type: 'comment',
            name: formData.name,
            comment: formData.comment,
            rating: formData.rating,
            approved: false,
            post: {
                _type: 'reference',
                _ref: postData._id,
            },
        };

        client.create(newComment).then(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }).catch((err) => {
            console.error('Comment submission error:', err);
            alert('There was an error submitting your comment.');
            setIsSubmitting(false);
        });
    };

    // Link හදන තැන නිවැරදි කරනවා
    const getLinkPath = (post) => {
        if (!post || !post.slug) return null;
        return post.type === 'archiveEpisode' 
            ? `/the-archives/episode/${post.slug}` 
            : `/decoded/${post.slug}`;
    };

    if (!postData) return <div className="loading-screen">Loading Content...</div>;
    
    // භාෂාව අනුව පෙන්නන්න ඕන content එක තෝරගන්නවා
    const title = language === 'en' ? postData.title_en : postData.title_si;
    const body = language === 'en' ? postData.body_en : postData.body_si;

    return (
        <>
            <article className="single-post-container">
                <header className="single-post-header">
                    <h1 className="single-post-title">{title}</h1>
                    <p className="single-post-date">{new Date(postData.publishedAt).toLocaleDateString()}</p>
                </header>

                {postData.imageUrl && (<img src={postData.imageUrl} alt={title} className="single-post-image"/>)}
                
                <div className="single-post-body">
                    {body ? <PortableText value={body} /> : <p>Content not available in this language.</p>}
                </div>
            </article>

            <section className="comment-section">
                <h3 className="comment-title">Leave a Review</h3>
                
                {isSubmitted ? ( <div className="submission-success">Thank you! Your comment has been submitted for review.</div> ) : (
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <div className="star-rating-input">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <svg key={ratingValue} onClick={() => handleRating(ratingValue)} className={ratingValue <= formData.rating ? 'star-filled' : 'star-empty'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                );
                            })}
                        </div>
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="form-input" required />
                        <textarea name="comment" placeholder="Your Comment..." value={formData.comment} onChange={handleChange} className="form-textarea" rows="5" required></textarea>
                        <button type="submit" className="form-button" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Comment'}</button>
                    </form>
                )}

                <div className="comment-list">
                    <h4 className="comment-list-title">Reviews</h4>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="comment-item">
                                <div className="comment-author-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-content-header">
                                        <p className="comment-author">{comment.name}</p>
                                        {comment.rating && <StarsDisplay rating={comment.rating} />}
                                    </div>
                                    <p className="comment-text">{comment.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : ( <p className="no-comments">No reviews yet. Be the first to comment!</p> )}
                </div>
            </section>

            <nav className="post-navigation">
                {postData.previousPost ? (<Link to={getLinkPath(postData.previousPost)} className="nav-link prev-link">&larr; Previous Post</Link>) : (<div />)}
                {postData.nextPost ? (<Link to={getLinkPath(postData.nextPost)} className="nav-link next-link">Next Post &rarr;</Link>) : (<div />)}
            </nav>
        </>
    );
}

export default SinglePostPage;