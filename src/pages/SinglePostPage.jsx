import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/client';
import { PortableText } from '@portabletext/react';
import { useLanguage } from '../context/LanguageContext';
import './SinglePostPage.css';

// Star component එකේ වෙනසක් අවශ්‍ය නෑ
const StarsDisplay = ({ rating }) => (
    <div className="stars-display">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={i < rating ? 'star-filled' : 'star-empty'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        ))}
    </div>
);

// භාෂාවට අදාළව පාවිච්චි වෙන වචන ටික එක තැනකට ගත්තා. මේකෙන් කෝඩ් එක පිළිවෙල වෙනවා.
const translations = {
    en: {
        loading: 'Loading Content...',
        contentNotAvailable: 'Content not available in this language.',
        leaveReview: 'Leave a Review',
        yourName: 'Your Name',
        yourComment: 'Your Comment...',
        submitting: 'Submitting...',
        submitComment: 'Submit Comment',
        submissionSuccess: 'Thank you! Your comment has been submitted for review.',
        reviews: 'Reviews',
        noReviews: 'No reviews yet. Be the first to comment!',
        previousPost: 'Previous Post',
        nextPost: 'Next Post',
        alertFields: 'Please fill out all fields and provide a rating.',
        alertError: 'There was an error submitting your comment.'
    },
    si: {
        loading: 'තොරතුරු ලබාගනිමින් පවතී...',
        contentNotAvailable: 'මෙම භාෂාවෙන් තොරතුරු නොමැත.',
        leaveReview: 'සमीක්ෂණයක් එක් කරන්න',
        yourName: 'ඔබේ නම',
        yourComment: 'ඔබේ අදහස...',
        submitting: 'යවමින් පවතී...',
        submitComment: 'අදහස යවන්න',
        submissionSuccess: 'ස්තූතියි! ඔබගේ අදහස සමාලෝචනය සඳහා ඉදිරිපත් කර ඇත.',
        reviews: 'සमीක්ෂණ',
        noReviews: 'තවමත් සमीක්ෂණ නොමැත. පළමුවැන්නා වන්න!',
        previousPost: 'පෙර ලිපිය',
        nextPost: 'ඊළඟ ලිපිය',
        alertFields: 'කරුණාකර සියලු ක්ෂේත්‍ර පුරවා rating එකක් ලබා දෙන්න.',
        alertError: 'ඔබගේ අදහස යැවීමේදී දෝෂයක් ඇතිවිය.'
    }
};

function SinglePostPage() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en; // Default to English if language not found

    const [postData, setPostData] = useState(null);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ name: '', comment: '', rating: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        const query = `*[_type in ["decodedPost", "archiveEpisode"] && slug.current == $slug][0]{
        _id,
        "type": _type,
        "title": coalesce(title_${language}, title_en, title),
        "body": coalesce(body_${language}, body_en, body),
        "imageUrl": mainImage.asset->url,
        publishedAt,
        // _type එක සලකන්නේ නැතුව, දාපු වෙලාව අනුව පෙර/ඊළඟ ලිපි හොයනවා
        "previousPost": *[_type in ["decodedPost", "archiveEpisode"] && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{ "slug": slug.current, "type": _type },
        "nextPost": *[_type in ["decodedPost", "archiveEpisode"] && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{ "slug": slug.current, "type": _type }
        }`;
        
        const commentsQuery = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt desc)`;

        setPostData(null); // Reset post data on slug/language change
        setLoading(true);

        client.fetch(query, { slug }).then((data) => {
            setPostData(data);
            if (data?._id) {
                client.fetch(commentsQuery, { postId: data._id }).then(setComments);
            }
        });
    }, [slug, language]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleRating = (rate) => setFormData({ ...formData, rating: rate });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.comment || formData.rating === 0) {
            alert(t.alertFields);
            return;
        }
        setIsSubmitting(true);
        
        const newComment = {
            _type: 'comment',
            name: formData.name,
            comment: formData.comment,
            rating: formData.rating,
            approved: false, // Comments need approval
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
            alert(t.alertError);
            setIsSubmitting(false);
        });
    };

    const getLinkPath = (post) => {
        if (!post || !post.slug) return "#";
        return post.type === 'archiveEpisode' 
            ? `/the-archives/episode/${post.slug}` 
            : `/decoded/${post.slug}`;
    };

    if (!postData) return <div className="loading-screen">{t.loading}</div>;

    return (
        <>
            <article className="single-post-container">
                <header className="single-post-header">
                    <h1 className="single-post-title">{postData.title}</h1>
                    {postData.publishedAt && <p className="single-post-date">{new Date(postData.publishedAt).toLocaleDateString()}</p>}
                </header>

                {postData.imageUrl && (<img src={postData.imageUrl} alt={postData.title} className="single-post-image"/>)}
                
                <div className="single-post-body">
                    {postData.body ? <PortableText value={postData.body} /> : <p>{t.contentNotAvailable}</p>}
                </div>
            </article>

            <section className="comment-section">
                <h3 className="comment-title">{t.leaveReview}</h3>
                
                {isSubmitted ? ( <div className="submission-success">{t.submissionSuccess}</div> ) : (
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <div className="star-rating-input">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <svg key={ratingValue} onClick={() => handleRating(ratingValue)} className={ratingValue <= formData.rating ? 'star-filled' : 'star-empty'} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                );
                            })}
                        </div>
                        <input type="text" name="name" placeholder={t.yourName} value={formData.name} onChange={handleChange} className="form-input" required />
                        <textarea name="comment" placeholder={t.yourComment} value={formData.comment} onChange={handleChange} className="form-textarea" rows="5" required></textarea>
                        <button type="submit" className="form-button" disabled={isSubmitting}>{isSubmitting ? t.submitting : t.submitComment}</button>
                    </form>
                )}

                <div className="comment-list">
                    <h4 className="comment-list-title">{t.reviews}</h4>
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
                    ) : ( <p className="no-comments">{t.noReviews}</p> )}
                </div>
            </section>

            <nav className="post-navigation">
                {postData.previousPost ? (<Link to={getLinkPath(postData.previousPost)} className="nav-link prev-link">&larr; {t.previousPost}</Link>) : (<div />)}
                {postData.nextPost ? (<Link to={getLinkPath(postData.nextPost)} className="nav-link next-link">{t.nextPost} &rarr;</Link>) : (<div />)}
            </nav>
        </>
    );
}

export default SinglePostPage;