import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearProducts, getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from 'react-rating-stars-component';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import instance from '../../../Instance/axios';
import ReviewCard from './Review/ReviewCard';
import { getCart } from '../../../components/Redux/Slice/cart'; // Adjust the path as necessary

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
    if (product?.quantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('No authentication token found');
      return;
    }

    try {
      const response = await instance.post(
        `/api/v1/product/addCart/${id}`,
        { quantity },
        { 
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true 
        }
      );
      
      if (response.status === 200) {
        setCart(response.data.cart);
        setQuantity(1); // Reset quantity after adding to cart
        toast.success("Product added to cart successfullyd", { autoClose: 1000 });
        navigate('/cart');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const getImagePublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <>
      {product ? (
        <div className='productdetail-container'>
          <div className='product-content'>
            <Carousel className='media'>
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
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
                ))
              ) : (
                <img
                  className='p-img'
                  src='https://via.placeholder.com/150'
                  alt='Placeholder'
                />
              )}
            </Carousel>
          </div>
          <div className='product-details'>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p>ID #{product._id}</p>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars value={parseFloat(product.rating) || 0} count={5} isHalf={true} />
            </div>
            <div className='detailsBlock-3'>
              <p><span>₹</span> {product.price}</p>
              <p><span>Availability:</span> {product.quantity === 0 ? 'Out of Stock' : 'In Stock'}</p>
              <div className='detailsBlock-3-1'>
                <div>
                  <button onClick={decreaseQuantity}>-</button>
                  <input
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
      ) : (
        <p>Loading product details...</p>
      )}
      <ReviewCard productId={id} />
      <ToastContainer />
    </>
  );
}

export default ProductDetails;
