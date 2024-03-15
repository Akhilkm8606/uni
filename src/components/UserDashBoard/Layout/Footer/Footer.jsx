import React from 'react';
import './Footer.css'; // Import your CSS file for styling

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h2>UNIFIED-CART</h2>
          <p>A description of your website or company.</p>
        </div>
        <div className='footer-section'>
          <h3>Quick Links</h3>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>Products</a></li>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>Contact</a></li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Unified-Cart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
