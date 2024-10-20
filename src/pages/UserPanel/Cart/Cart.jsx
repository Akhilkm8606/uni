import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import instance from '../../../Instance/axios';
import { MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set());
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
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [dispatch, isAuthenticated, user, navigate]);

  const calculateTotalPrice = (item) => item.quantity * item.productId.price;

  const calculateSelectedTotalPrice = () => {
    let total = 0;
    selectedItems.forEach(itemId => {
      const item = cart.find(cartItem => cartItem._id === itemId);
      if (item) {
        total += calculateTotalPrice(item);
      }
    });
    return total;
  };

  const handleRemoveCartItem = async (itemId) => {
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
        setCart(prevCart => prevCart.filter(item => item._id !== itemId));
        toast.success('Item removed from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity to less than 1

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
        setCart(prevCart => prevCart.map(item => 
          item._id === itemId ? { ...item, quantity } : item
        ));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update quantity.');
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      newSelected.has(itemId) ? newSelected.delete(itemId) : newSelected.add(itemId);
      return newSelected;
    });
  };

  const handleBuySelectedItems = () => {
    const itemsToBuy = cart.filter(item => selectedItems.has(item._id));
    if (itemsToBuy.length === 0) {
      toast.error('No items selected for purchase.');
      return;
    }
    navigate('/Order', { state: { items: itemsToBuy } });
  };

  return (
    <div className="cart-container">
      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>
            Start Shopping Now
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-header">
            <h2>Your Shopping Cart</h2>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-image">
                  <Link to={`/product/${item.productId._id}`}>
                    <img
                      className="product-image"
                      src={item.productId.images[0] || 'https://via.placeholder.com/150'}
                      alt={item.productId.name || 'Product Image'}
                    />
                  </Link>
                </div>
                <div className="item-details">
                  <h5>{item.productId.name}</h5>
                  <p>{item.productId.description}</p>
                  <div className="item-price-quantity">
                    <h5>Price: ₹{item.productId.price}/-</h5>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item._id)}
                      onChange={() => handleSelectItem(item._id)}
                    />
                    <div className="quantity-controls">
                      <button onClick={() => updateItemQuantity(item._id, Math.max(item.quantity - 1, 1))}>-</button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => handleRemoveCartItem(item._id)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h4>Total Selected Price: ₹{calculateSelectedTotalPrice()}</h4>
            <button className="buy-button" onClick={handleBuySelectedItems}>
              Buy Selected
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
