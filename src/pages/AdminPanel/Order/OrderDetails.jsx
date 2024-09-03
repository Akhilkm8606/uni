import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import instance from '../../../Instance/axios';
import { updateOrder } from '../../../components/Redux/Slice/orders';
import CloseBtn from '../../../components/Buttons/CloseBtn';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import './Order-D.css';

function OrderDetails({ order, onClose }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const users = useSelector(state => state.auth.users);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (order) {
      const userId = order.user;
      const customerDetails = users.find(user => user._id === userId);
      setCustomer(customerDetails);
    }
  }, [order, users]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await instance.put(`/api/v1/order/status/${order._id}`, {
        status: selectedStatus,
      }, { withCredentials: true });

      dispatch(updateOrder(response.data.order));
      onClose(); // Close the modal after update
    } catch (error) {
      setErrorMessage(error.response.data.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='order-details-container'>
      <div className='order-details-header'>
        <h2>Order Details</h2>
        <CloseBtn onClick={onClose} />
      </div>

      <div className='order-details-content'>
        <form className='order-form' onSubmit={handleSubmit}>
          <div className='order-summary'>
            <h3>Order Summary</h3>
            {order && (
              <ul className='order-summary-list'>
                <li><strong>Order ID</strong> {order._id}</li>
                <li><strong>Current Status</strong> {order.status}</li>
                <li><strong>Payment Method</strong> {order.paymentMethod}</li>
                <li><strong>Payment Status</strong> {order.paymentStatus}</li>
                <li><strong>Total Price</strong> ${order.totalPrice.toFixed(2)}</li>
              </ul>
            )}
            <div className='order-actions'>
              <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="">-- Select New Status --</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Update Status'}
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          </div>
        </form>

        <div className='customer-details'>
  <h3>Customer Details</h3>
  {customer && (
    <div className='customer-info'>
      <img src="https://source.unsplash.com/random/?superbike" alt="Customer" />
      <div className='customer-text'>
        <p><strong>{customer.username}</strong></p>
        <p><MarkEmailReadOutlinedIcon /> {customer.email}</p>
        <p><PhonelinkRingOutlinedIcon /> {customer.phone}</p>
      </div>
    </div>
  )}
</div>

        <div className='shipping-address'>
          <h3>Shipping Address</h3>
          {order && (
            <div className='shipping-info'>
              <p><strong>Full Name:</strong> {order.shippingAddress.FullName}</p>
              <p><strong>Address:</strong> {order.shippingAddress.Address}</p>
              <p><strong>Apartment:</strong> {order.shippingAddress.Apartment}</p>
              <p><strong>City:</strong> {order.shippingAddress.City}</p>
              <p><strong>Landmark:</strong> {order.shippingAddress.LandMark}</p>
              <p><strong>Postal Code:</strong> {order.shippingAddress.PostalCode}</p>
            </div>
          )}
        </div>

        <div className='product-N-details'>
          <h3>Product Details</h3>
          {order && (
            <div className='product-list'>
              {order.items.map(item => (
                <div key={item._id} className='product-item'>
                  <p><strong>Product Name:</strong> {item.name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
