import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearProducts, getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from 'react-rating-stars-component';
import { Row, Col, Button } from 'react-bootstrap';
import ReviewCard from './Review/ReviewCard';
import { ToastContainer, toast } from 'react-toastify';
import { getCart } from '../../../components/Redux/Slice/cart';
import instance from '../../../Instance/axios';

function ProductDetails() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(state => state.product.product);
  
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(clearProducts());
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

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
      const response = await instance.post(
        `/api/v1/product/addCart/${id}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(response.data.cart);
      setQuantity(1); // Reset quantity after adding to cart
      toast.success('Product added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  useEffect(() => {
    dispatch(getCart(cart)); // Dispatch the action without logging the cart state
  }, [dispatch, cart]);

  // Helper function to extract public ID from a full Cloudinary URL
  const getImagePublicId = (imageUrl) => {
    // Assuming Cloudinary URLs end with the public ID
    const urlParts = imageUrl.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <>
      {product && (
        <div className='productdetail-container'>
          <div className='product-content'>
            <Carousel className='media'>
              {product.images.map((image, index) => (
                <img
                  className='p-img'
                  src={
                    image
                      ? image.startsWith('http')
                        ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(image)}`
                        : `https://res.cloudinary.com/dbyfurx53/image/upload/${image}`
                      : 'https://via.placeholder.com/150' // Fallback image
                  }
                  alt={product.name}
                  key={index}
                />
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
                  <button onClick={decreaseQuantity}>-</button>
                  <input
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    value={quantity}
                    type='number'
                  />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <div className='detailsBlock-3-1-1'>
                  <Link className='addToCart' onClick={handleAddToCart}>ADD TO CART</Link>
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
