import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from 'react-rating-stars-component';
import { Row, Col } from 'react-bootstrap';

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Access the product ID from the URL params
  const product = useSelector(state => state.product.products);
  console.log(product, 'hjhj');

  useEffect(() => {
    dispatch(getProductDetails(id)); // Dispatch the action to fetch product details
  }, [dispatch, id]);

  // Manual reviews for demonstration
  const manualReviews = [
    {
      username: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4,
      comment: 'Great product! Highly recommended.'
    },
    {
      username: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 5,
      comment: 'Excellent quality and fast delivery.'
    }
    // Add more reviews as needed
  ];

  return (
    <>
      {product && (
        <div className='productdetail-container'>
          <div className='product-content'>
            <Carousel className='media'>
              {product.images.map((image, index) => (
                <img key={index + 1} src={`http://localhost:5000/uploads/${image}`} alt={product.name} />
              ))}
            </Carousel>
            {/* Add more product details as needed */}
          </div>
          <div className='product-details'>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p> Product #{product._id}</p>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars {...Option} value={product.rating} count={5} />
            </div>
            <div className='detailsBlock-3'>
              <p>
                <span>₹</span> {product.price}
              </p>
              <div className='detailsBlock-3-1'>
                <div>
                <button>-</button>
                <input value={1} type='number' />
                <button>+</button>
                </div>
                
                <div className='detailsBlock-3-1-1'>
                  <Link to={`/product/cart/${product._id}`}>ADD CART</Link>
                </div>
              </div>
            </div>
            <div>
              <p>
                <span>Description:</span> {product.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className='review-container'>
        <Row>
          <h2 className='review-header'>REVIEWS</h2>
        </Row>
        <Row className='reviews'>
          {manualReviews.map((review, index) => (
            <Col key={index} md={6}>
              <div className='review-item'>
                <div className='user-avatar'>
                  <img src={review.avatar} alt={`Avatar of ${review.username}`} />
                </div>
                <div className='user-info'>
                  <h4>{review.username}</h4>
                  <ReactStars {...Option} value={review.rating} count={5} />
                </div>
                <p>{review.comment}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default ProductDetails;
