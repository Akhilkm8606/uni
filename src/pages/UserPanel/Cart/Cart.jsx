import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import instance from '../../../Instance/axios';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
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

  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart) && cart.forEach(item => {
      total += item.quantity * item.productId.price;
    });
    return total;
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No authentication token found.');
        return;
      }

      const items = selectedItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }));

      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const orderDetails = {
        user: user._id,
        items,
        totalPrice,
        status: "pending", // Set your default status
        shippingAddress: "Your Shipping Address", // Update as needed
        paymentMethod: "cash on delivery", // or "razorpay" based on your logic
      };

      const response = await instance.post('/api/v1/orders', orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        toast.success('Order placed successfully!');
        setCart([]); // Clear cart after successful order
        setSelectedItems([]); // Clear selected items
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(itemId)) {
        // If already selected, remove it
        return prevSelected.filter(id => id !== itemId);
      } else {
        // Otherwise, add it
        return [...prevSelected, itemId];
      }
    });
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
        <div className='cart-container'>
          <h2>Your Shopping Cart</h2>
          <div className='cartdiv'>
            {Array.isArray(cart) && cart.map((item, index) => (
              <div className='cart-item-div' key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleSelectItem(item.productId._id)}
                  checked={selectedItems.includes(item.productId._id)}
                />
                <span>{item.productId.name} - Price: ₹{item.productId.price} - Quantity: {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h4>Total Price: ₹{calculateTotalCartPrice()}</h4>
            <button className="buy-button" onClick={createOrder} disabled={selectedItems.length === 0}>
              Buy Selected Items
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
