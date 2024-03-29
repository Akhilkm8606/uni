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
import { addReview, addReviews } from '../../../../components/Redux/Slice/review';


function ReviewCard({productId}) {
  console.log(productId,'id');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const product = useSelector(state => state.product.products);


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

   
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
      
       
          const response = await axios.get(`http://localhost:5000/getReview/${productId}`, {
            withCredentials: true
          });
          setReviews(response.data);
          console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchReviewData();

  }, [dispatch]);
  
  const reviewHandler = async (e) => {
    e.preventDefault();
  
    try {
      // Send the request to add the review
      const response = await axios.post(
        `http://localhost:5000/addReview/${productId}`,
        { 
          comment: comment,
          rating: rating
        },
        {
          withCredentials: true // Include this if your backend requires credentials
        }
      );
  
    
     
      if (response.status === 200) {
        // Extract the newly added review from the response data
        const newReview = response.data.review; // Assuming the server returns the newly added review
        
        // Dispatch the addReview action with the new review as payload
        dispatch(addReviews(newReview));
  
        // Reset comment and rating
        setComment('');
        setRating(0);
  
        toast.success("Review added", {
          autoClose: 1000,
        });
      } else {
        // If response status is not 200, show error message
        toast.error('Failed to add review');
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
            color="white"
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
      <Row >
        <div className="reviews">
        {reviews && (
          <Col  md={6}>
            <div className="review-item">
              
              <div className="user-info">
                <h4>{reviews.username}</h4>
                <ReactStars value={product.rating} count={5} size={24} color="white" edit={false} />
              </div>
              <p>{reviews.comment}</p>
            </div>
          </Col>
        )}
        </div>
       
      </Row>
    </div>
  );
}

export default ReviewCard;
