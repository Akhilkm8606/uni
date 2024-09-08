import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearProducts, getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from 'react-rating-stars-component';
import { Row, Col, Button } from 'react-bootstrap';
import ReviewCard from './Review/ReviewCard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { getCart } from '../../../components/Redux/Slice/cart';
import instance from '../../../Instance/axios';

function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    dispatch(getProductDetails(id));
    // Clear products from Redux store if needed
    // dispatch(clearProducts()); 
  }, [dispatch, id]);

  const product = useSelector(state => state.product.product);
  console.log(product);

  const increaseQuantity = () => {
    if (product.quantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await instance.post(`/api/v1/product/addCart/${id}`, { quantity }, { withCredentials: true });
      // Update the cart in Redux store
      dispatch(getCart()); // Assuming this updates cart state
      setQuantity(1); // Reset quantity after adding to cart
      toast.success('Product added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <>
      {product && (
        <div className='productdetail-container'>
          <div className='product-content'>
            <Carousel className='media'>
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={product.name} />
              ))}
            </Carousel>
          </div>
          <div className='product-details'>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p>ID #{product._id}</p>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars value={parseFloat(product.rating) || 0} count={5} isHalf={true} />
              <div>Reviews: ({product.reviews.length})</div>
            </div>
            <div className='detailsBlock-3'>
              <p><span>₹</span> {product.price}</p>
              <p><span>Availability:</span> {product.quantity === 0 ? 'Out of Stock' : 'In Stock'}</p>
              <div className='detailsBlock-3-1'>
                <div>
                  <Button variant="outline-primary" onClick={decreaseQuantity}>-</Button>
                  <input
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    value={quantity}
                    type='number'
                    min='1'
                  />
                  <Button variant="outline-primary" onClick={increaseQuantity}>+</Button>
                </div>
                <div className='detailsBlock-3-1-1'>
                  <Button variant="primary" onClick={handleAddToCart}>ADD TO CART</Button>
                </div>
              </div>
            </div>
            <div>
              <p><span>Description:</span> {product.description}</p>
            </div>
          </div>
        </div>
      )}
      <ReviewCard productId={id} />
      <ToastContainer />
    </>
  );
}

export default ProductDetails;
