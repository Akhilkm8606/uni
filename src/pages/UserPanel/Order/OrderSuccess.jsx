import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'; // Assuming you want to style this component

function OrderSuccess() {
  return (
    <div className="order-success-container">
      <h1>Order Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <p>Thank you for shopping with us!</p>
      <div className="order-details">
        <h2>Order Details:</h2>
        <ul>
          <li>Order Number: <strong>#12345</strong></li>
          <li>Estimated Delivery: <strong>5-7 business days</strong></li>
        </ul>
      </div>
      <div className="actions">
        <Link to="/" className="btn">Return to Home</Link>
        <Link to="/orders" className="btn">View Orders</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
