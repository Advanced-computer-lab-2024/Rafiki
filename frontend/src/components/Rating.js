import React, { useState } from 'react';
import './Rating.css'; // Import CSS for styling

const Rating = ({ itemId, onRate }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0) {
            onRate(itemId, rating, comment);  // Pass `itemId` to `onRate`
            setComment('');
            setRating(0);
        }
    };

    return (
        <div className="rating-container">
            <form onSubmit={handleSubmit} className="rating-form">
                <div className="rating-inputs">
                    <label className="rating-label">Rate your experience:</label>
                    <div className="rating-stars">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className="star">
                                <input 
                                    type="radio" 
                                    value={index + 1} 
                                    checked={rating === index + 1} 
                                    onChange={() => setRating(index + 1)} 
                                    className="star-input"
                                    aria-label={`Rate ${index + 1} stars`}
                                />
                                {index + 1} ⭐
                            </span>
                        ))}
                    </div>
                </div>

                <div className="comment-input">
                    <label className="comment-label">Comment:</label>
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Leave a comment..." 
                        className="comment-textarea"
                        aria-label="Leave a comment"
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Rating;
