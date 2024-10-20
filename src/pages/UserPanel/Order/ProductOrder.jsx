import React, { useEffect, useState } from 'react';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../Instance/axios';

function ProductOrderForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const cartItems = location.state?.items || [];
  const [formData, setFormData] = useState({
    user: user?._id || '',
    sellerId: cartItems.length ? cartItems[0].productId.userId : '',
    items: cartItems.map(item => ({
      product: item.productId._id,
      name: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price
    })),
    totalPrice: cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0) + 20, // Add shipping
    status: 'Pending',
    paymentMethod: '',
    shippingAddress: {
      FullName: '',
      MobileNumber: '',
      Address: '',
      Apartment: '',
      LandMark: '',
      City: '',
      State: '',
      ZipCode: ''
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login", {
        autoClose: 1000,
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalPrice" || name === "paymentMethod") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        shippingAddress: { ...formData.shippingAddress, [name]: value }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/api/v1/order', formData);
      if (response.status === 200) {
        toast.success('Order placed successfully!');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className='order'>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h5>Shipping Address</h5>
            <input
              type="text"
              name="FullName"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="MobileNumber"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="Address"
              placeholder="Address"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="Apartment"
              placeholder="Apartment"
              onChange={handleChange}
            />
            <input
              type="text"
              name="LandMark"
              placeholder="Landmark"
              onChange={handleChange}
            />
            <input
              type="text"
              name="City"
              placeholder="City"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="State"
              placeholder="State"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="ZipCode"
              placeholder="Zip Code"
              required
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <h5>Payment Method</h5>
            <select name="paymentMethod" onChange={handleChange} required>
              <option value="" disabled selected>Select Payment Method</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
            <h5>Total Price: ₹{formData.totalPrice}</h5>
            <button type="submit" className='submit-button'>Place Order</button>
          </Col>
        </Row>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ProductOrderForm;
