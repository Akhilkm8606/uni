import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import { getCart } from '../../../components/Redux/Slice/cart';
import { MdDelete } from 'react-icons/md';
import instance from '../../../Instance/axios';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('No authentication token found. Please log in.');
          navigate('/login');
          return;
        }

        const response = await instance.get(`/api/v1/carts/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setCart(response.data.userCart);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart. Please try again later.');
        setLoading(false); // Ensure loading is set to false even on error
      }
    };

    fetchCartData();
  }, [dispatch, isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found.');
        return;
      }

      const response = await instance.put(`/api/v1/cart/edit/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      if (response.status === 200) {
        setCart(prevCart => {
          const updatedCart = prevCart.map(item => {
            if (item._id === itemId) {
              const updatedItem = { ...item, quantity };
              updatedItem.amount = calculateTotalPrice(updatedItem);
              return updatedItem;
            }
            return item;
          });
          return updatedCart;
        });
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update quantity.');
    }
  }, [setCart]);

  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart) && cart.forEach(item => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  const handleRemoveCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found.');
        return;
      }

      const response = await instance.delete(`/api/v1/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (response.status === 200) {
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  // Function to get the public ID from the image URL
  const getImagePublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const [publicId] = fileNameWithExtension.split('.'); // Split by dot and take the first part
    return publicId;
  };

  return (
    <div className="cart-container">
      {loading ? (
        <Loader />  // Render Loader while loading is true
      ) : cart == null || cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>
            Start Shopping Now
          </button>
        </div>
      ) : (
        <div className='cart-container'>
          {/* Conditionally render the cart header only if cart has items */}
          {cart.length > 0 && (
            <div className="cart-header">
              <h2>Your Shopping Cart</h2>
            </div>
          )}
          <div className='cartdiv'>
            {Array.isArray(cart) && cart.map((item, index) => (
              <div className='cart-item-div' key={index}>
                <div className='item-image'>
                  <Link className='item-link' to={`/product/${item?.productId?._id}`}>
                    <img
                      className='p-img'
                      src={
                        item?.productId?.images?.[0]
                          ? item?.productId?.images?.[0].startsWith('http')
                            ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(item?.productId?.images?.[0])}`
                            : `https://res.cloudinary.com/dbyfurx53/image/upload/${item?.productId?.images?.[0]}`
                          : 'https://via.placeholder.com/150' // Fallback image
                      }
                      alt={item?.productId?.name || 'Product Image'}
                      key={index}
                    />
                  </Link>
                </div>
                <div className='cart-text'>
                  {item?.productId?.name && (
                    <h5>{item.productId.name}</h5>
                  )}
                  <p>{item?.productId?.description}</p>
                  <div className='pqr-div'>
                    <div className='cpr'>
                      <span id={item?.productId?._id}><h5>Price: {item?.productId?.price}/-</h5></span>
                    </div>
                    <div className='cart-product-quantity'>
                      <button onClick={() => updateQuantity(item._id, Math.max(item.quantity - 1, 1))}>-</button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <div className='remove-btn'>
                      <button onClick={() => handleRemoveCart(item._id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='buy-div'>
                  <Link className='buy-button' to={`/Order/${item?._id}`}>
                    Buy
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h4>Total Price: ₹{calculateTotalCartPrice()}</h4>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
