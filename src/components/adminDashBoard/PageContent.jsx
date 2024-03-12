// PageContent.jsx
import React from 'react';
import '../adminDashBoard/style.css';
import Products from '../../pages/AdminPanel/Products/Products'; // Ensure this import is correct
import Orders from '../../pages/AdminPanel/Orders'; // Ensure this import is correct
import Users from '../../pages/AdminPanel/Users/Users'; // Ensure this import is correct
import Dashboard from '../../pages/AdminPanel/Dashboard';
import Profile from '../../pages/AdminPanel/Profile';
import AddProdcts from '../../pages/AdminPanel/Products/ProductList';

function PageContent({ option }) {
  console.log("Received option:", option); // Check if option is received correctly
  return (
    <div className='PanelPages'>
      {option === 'Admin-dashBoard' && <Dashboard /> }
      {option === 'Products' && <Products />}
      {option === 'Users' && <Users />}
      {option === 'Orders' && <Orders />}
      {option === 'profile' && <Profile />}
      {option === 'AddProdcts' && <AddProdcts />}       {/* Debugging statement for the option */}
       
    </div>
  );
}

export default PageContent;
