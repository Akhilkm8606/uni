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

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Fetch cart when component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('No authentication token found. Please log in.');
          navigate('/login');
          return;
        }

        if (isAuthenticated && user) {
          const response = await instance.get(`/api/v1/user/carts/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          console.log(response.data.userCart);
          setCart(response.data.userCart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart. Please try again later.');
      }
    };

    fetchCartData();
  }, [dispatch, isAuthenticated, user, navigate]);

  // Update cart in Redux store
  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  // Calculate total price for each item
  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  // Update item quantity in the cart
  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found.');
        return;
      }

      const response = await instance.put(`/api/v1/user/cart/edit/${itemId}`, 
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

  // Calculate total price for the cart
  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart) && cart.forEach(item => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  // Handle removing item from cart
  const handleRemoveCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found.');
        return;
      }

      const response = await instance.delete(`/api/v1/user/cart/delete/${itemId}`, {
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

  return (
    <div className="cart-container">
      {cart == null || cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>
            Start Shopping Now
          </button>
        </div>
      ) : (
        <div className='cart-container'>
          <div className="cart-header">
            <h2>Your Shopping Cart</h2>
          </div>
          <div className='cartdiv'>
            {Array.isArray(cart) && cart.map((item, index) => (
              <div className='cart-item-div' key={index}>
                <div className='item-image'>
                  <Link className='item-link' to={`/product/${item?.productId?._id}`}>
                    <img 
                      src={item?.productId?.images?.[0] ? 
                      `https://unified-cart-client.vercel.app/uploads/${item.productId.images[0]}` 
                      : '/placeholder.jpg'} 
                      alt={item?.productId?.name || 'Product Image'} 
                      className="card-img-top" 
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
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
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
        </div>
      )}
    </div>
  );
}

export default Cart;
