import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import { getCart } from '../../../components/Redux/Slice/cart';
import { MdDelete } from 'react-icons/md';

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }
        if (isAuthenticated && user) {
          const response = await axios.get(`http://localhost:5000/user/carts/${user._id}`, {
            withCredentials: true
          });
          setCart(response.data.userCart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();
  }, [dispatch, isAuthenticated, user, navigate]);

  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/cart/edit/${itemId}`, { quantity }, { withCredentials: true });
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
    }
  }, [setCart, calculateTotalPrice]);

  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart) && cart.forEach(item => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  const handleRemoveCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart/delete/${itemId}`, {
        withCredentials: true
      });
      if (response.status === 200) {
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-container">
      {cart == null || cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>Start Shopping Now</button>
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
                  <Link className='item-link' to={`/product/${item.productId._id}`} >
                    <img src={`http://localhost:5000/uploads/${item.productId.images[0]}`} alt={item.productId.name} className="card-img-top" />
                  </Link>
                </div>
                <div className='cart-text'>
                  {item && item.productId && item.productId.name && (
                    <h5>{item.productId.name}</h5>
                  )}
                  <p>{item.productId.description}</p>
                  <div className='pqr-div'>
                    <div className='cpr'>
                      <span id={item.productId}><h5>Price : {item.productId.price}/-</h5></span>
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
                <Link className='buy-button' to={`/Order/${item._id}`}>
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
