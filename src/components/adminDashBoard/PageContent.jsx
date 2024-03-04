// PageContent.jsx
import React from 'react';
import '../adminDashBoard/style.css';
import Products from '../../pages/AdminPanel/Products'; // Ensure this import is correct
import Orders from '../../pages/AdminPanel/Orders'; // Ensure this import is correct
import Users from '../../pages/AdminPanel/Users'; // Ensure this import is correct
import Dashboard from '../../pages/AdminPanel/Dashboard';

function PageContent({ option }) {
  console.log("Received option:", option); // Check if option is received correctly
  return (
    <div className='PanelPages'>
      {option === 'Admin-dashBoard' && <Dashboard />}
      {option === 'Products' && <Products />}
      {option === 'Users' && <Users />}
      {option === 'Orders' && <Orders />}
    </div>
  );
}

export default PageContent;
