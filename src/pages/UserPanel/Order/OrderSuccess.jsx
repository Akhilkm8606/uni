import React from 'react';
import { Link } from 'react-router-dom';
import './order.css'; // Import the CSS file

function OrderSuccess() {
  return (
    <div className="order-success-container">
      <h1>Order Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <p>Thank you for shopping with us!</p>
     
      <div className="actions">
        <Link to="/" className="btn">Return to Home</Link>
        <Link to="/orders" className="btn">View Orders</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
