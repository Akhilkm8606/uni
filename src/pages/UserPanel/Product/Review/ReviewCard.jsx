import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../Review/Review.css';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Try } from '@mui/icons-material';
import { getProductDetails } from '../../../../actions/ProductAction';
import instance from '../../../../Instance/axios';
  

function ReviewCard({productId}) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const product = useSelector(state => state.product.product);


  const [reviews, setReviews] = useState([])
  const ratingHandler = (value) => {
    setRating(value);
  };

   
  
  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const response = await instance.post(
          `/api/v1/addReview/${productId}`,
          { 
            comment: comment,
            rating: rating
          },
          {
            withCredentials: true
          }
        );
        if (response.status === 200) {
          const newReview = response.data.product.reviews;
          setReviews(newReview)
          dispatch(getProductDetails(productId)); 
        
          setComment('');
          setRating(0);
          toast.success("Review added", { autoClose: 1000 });
        } else {
          toast.error('Failed to add review');
        }

      }
      else{
        toast.error("Please login to add a review", { autoClose: 1000 });

      }
     
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };
  
  return (
    <div className="review-container">
      <Row>
        <h2 className="review-header">REVIEWS</h2>
      </Row>
      <Row className="review-row">
        <Col className="review-Col" md={6}>
          <p>Please rate the product and leave your review below:</p>
          <ReactStars
            value={rating}
            onChange={(value) => ratingHandler(value)}
            count={5}
            size={24}
           
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
     <Row>
  <div className="reviews">
    {product && product.reviews && product.reviews.map((review, index) => (
      <Col key={index} md={6}>
        <div className="review-item">
          <div className="user-info">
            <h4>{review.username}</h4>
          
            <ReactStars
              value={review.rating}
              count={5}
              size={24}
              color="white"
              edit={false}
            />
          </div>
          <p>{review.comment}</p>
        </div>
      </Col>
    ))}
  </div>
</Row>

    </div>
  );
}

export default ReviewCard;
