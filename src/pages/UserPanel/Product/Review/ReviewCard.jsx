import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../Review/Review.css';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAuthentic } from '../../../../components/Redux/Slice/user';

function ReviewCard() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(null);
  const user = useSelector(state => state.auth.user)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [reviews, setReviews] = useState([
    {
      username: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4,
      comment: 'Great product! Highly recommended.',
    },
    {
      username: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 5,
      comment: 'Excellent quality and fast delivery.',
    },
  ]);

  
  const ratingHandler = (value) => {
    setRating(value);
  };

  const reviewHandler = async (e) => {
    e.preventDefault();
  
    if (!isAuthenticated) {
      toast.error("Please login to add a review", {
        autoClose: 1000,
      });
      return;
    }
  
    if (!rating || !comment) {
      // Display an error message if either rating or comment is missing
      toast.error('Please provide both a rating and a comment.');
      return;
    }
  
    // Create the new review object
    const newReview = {
      username: user.username,
      avatar: 'https://randomuser.me/api/portraits/lego/6.jpg', // Add logic to get the avatar dynamically
      rating: rating,
      comment: comment,
    };
  
    // Update the reviews array in the state
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
  
    // Save the updated reviews array to localStorage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  
    // Reset the comment and rating state
    setComment('');
    setRating(0);
  
    // Display a success message to the user
    toast.success("Review added", {
      autoClose: 1000,
    });
  };
  
  return (
    <div className="review-container">
      <Row>
        <h2 className="review-header">REVIEWS</h2>
      </Row>
      <Row className="review-row">
        <Col className="review-Col" md={6}>
          <ReactStars
            onChange={(value) => ratingHandler(value)}
            {...Option}
            defaultValue={0}
            count={5}
          />
          <form className="add_review" onSubmit={reviewHandler}>
            <input
              type="text"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Add Review</button>
          </form>
        </Col>
      </Row>
      <Row className="reviews">
        {reviews.map((review, index) => (
          <Col key={index} md={6}>
            <div className="review-item">
              <div className="user-avatar">
                <img src={review.avatar} alt={`Avatar of ${review.username}`} />
              </div>
              <div className="user-info">
                <h4>{review.username}</h4>
                <ReactStars {...Option} value={review.rating} count={5} />
              </div>
              <p>{review.comment}</p>
            </div>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </div>
  );
}

export default ReviewCard;
