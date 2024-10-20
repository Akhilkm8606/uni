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
  const [selectedItems, setSelectedItems] = useState(new Set()); // To keep track of selected items
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart. Please try again later.');
        setLoading(false);
      }
    };

    fetchCartData();
  }, [dispatch, isAuthenticated, user, navigate]);

  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart) && cart.forEach(item => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  const calculateSelectedTotalPrice = () => {
    let total = 0;
    selectedItems.forEach(itemId => {
      const item = cart.find(item => item._id === itemId);
      if (item) {
        total += calculateTotalPrice(item);
      }
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

  const updateQuantity = async (itemId, quantity) => {
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
          return prevCart.map(item => {
            if (item._id === itemId) {
              return { ...item, quantity }; // Update the quantity
            }
            return item;
          });
        });
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update quantity.');
    }
  };

  const handleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

 const handleBuyAll = () => {
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
      ) : cart == null || cart.length === 0 ? (
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
                      className='p-img'
                      src={item?.productId?.images?.[0] || 'https://via.placeholder.com/150'} // Fallback image
                      alt={item?.productId?.name || 'Product Image'}
                    />
                  </Link>
                </div>
                <div className='cart-text'>
                  {item?.productId?.name && <h5>{item.productId.name}</h5>}
                  <p>{item?.productId?.description}</p>
                  <div className='pqr-div'>
                    <div className='cpr'>
                      <span id={item?.productId?._id}><h5>Price: ₹{item?.productId?.price}/-</h5></span>
                      <div className='select-item'>
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item._id)}
                        onChange={() => handleSelectItem(item._id)}
                      />
                    </div>
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
              </div>
            ))}
          </div>
          
          <div className="cart-total">
          <h4>Total Selected Price: ₹{calculateSelectedTotalPrice()}</h4>
    <Link className="buy-button" to={`/Order/${cart[0]._id}`}> {/* Use cart[0]._id for the link */}
        Buy
    </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
