import React from 'react';
import '../adminDashBoard/style.css';
import ProductList from '../../pages/AdminPanel/Products/List/ProductList';
import OrderList from '../../pages/AdminPanel/Order/Orders';
import Dashboard from '../../pages/AdminPanel/Dashboard';
import Profile from '../../pages/AdminPanel/Profile';
import AddProdcts from '../../pages/AdminPanel/Products/Add/AddProduct';
import ProductCategory from '../../pages/AdminPanel/Products/Categories/ProductCateGory';
import UserList from '../../pages/AdminPanel/Users/UserList';
import DashBord from '../../pages/SellerPanel/DashBord';
import Store from '../../pages/SellerPanel/Store';
import Order from '../../pages/AdminPanel/Order/Orders';
import Orders from '../../pages/SellerPanel/Order';

function PageContent({ option, userRole }) {
  if (userRole === 'admin') {
    switch (option) {
      case 'Admin-dashBoard':
        return <Dashboard />;
      case 'AddProducts':
        return <AddProdcts />;
      case 'ProductList':
        return <ProductList />;
      case 'CategoryList':
        return <ProductCategory />;
      case 'UserList':
        return <UserList />;
      case 'OrderList':
        return <OrderList />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />; // Default to Dashboard if option is not recognized
    }
  }

  if (userRole === 'seller') {
    switch (option) {
      case 'seller-dashBoard':
        return <DashBord />;
      case 'seller-AddProducts':
        return <AddProdcts />;
      case 'seller-ProductList':
        return <Store />;
      case 'seller-OrdersList':
        return <Orders />;
      default:
        return <DashBord />; // Default to Dashboard if option is not recognized
    }
  }

  return null; // Fallback if no userRole matches
}

export default PageContent;
