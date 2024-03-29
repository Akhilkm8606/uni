import React, { useEffect, useState } from 'react';
import { Link, json, useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from 'react-rating-stars-component';
import { Row, Col, Button } from 'react-bootstrap';
import ReviewCard from './Review/ReviewCard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function ProductDetails() {
  
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [buyProduct, setBuyProduct] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const { id } = useParams(); // Access the product ID from the URL params
  const product = useSelector(state => state.product.products);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.quantity > quantity) {
      const quty = quantity + 1;
      setQuantity(quty);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const quty = quantity - 1;
      setQuantity(quty);
    }
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const buyItem = () => {
    

  };
 
const handleAddToCart = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/product/addCart/${id}`, { quantity }, { withCredentials: true });
    // Update the cart state with the response data
    setCart(response.data.cart);
    setQuantity(1); // Reset quantity after adding to cart
    toast.success('Product added to cart successfully');
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
                <img key={index + 1} src={`http://localhost:5000/uploads/${image}`} alt={product.name} />
              ))}
            </Carousel>
          </div>
          <div className='product-details'>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p> Product #{product._id}</p>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars value={parseFloat(product.rating) || 0} count={5}        color="white"/>
              <div>Reviews :({product.reviews.length})</div>
            </div>
            <div className='detailsBlock-3'>
              <p><span>₹</span> {product.price}</p>
              <p><span>Availability:</span> {product.quantity === 0 ? 'Out of Stock' : 'In Stock'}</p>
              <div className='detailsBlock-3-1'>
                <div>
                  <button onClick={decreaseQuantity}>-</button>
                  <input onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity} type='number' />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <div className='detailsBlock-3-1-1'>
                  <Link className='addToCart' to={'/cart'}  onClick={handleAddToCart}>ADD CART</Link>
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
