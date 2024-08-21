// PageContent.jsx
import React from 'react';
import '../adminDashBoard/style.css';
import ProductList from '../../pages/AdminPanel/Products/List/ProductList'; // Ensure this import is correct
import OrderList from '../../pages/AdminPanel/Order/Orders'; // Ensure this import is correct
import Dashboard from '../../pages/AdminPanel/Dashboard';
import Profile from '../../pages/AdminPanel/Profile';
import AddProdcts from '../../pages/AdminPanel/Products/Add/AddProduct';
import ProductCategory from '../../pages/AdminPanel/Products/Categories/ProductCateGory';
import UserList from '../../pages/AdminPanel/Users/UserList';
import DashBord from '../../pages/SellerPanel/DashBord';
import Store from '../../pages/SellerPanel/Store';
import Order from '../../pages/SellerPanel/Order';


function PageContent({ option, userRole }) {
  return (
    <div className='PanelPages'>
      {userRole === 'admin' && (
        <>
          {(option === 'Admin-dashBoard' || option === 'Products' || option === 'Users' || option === 'Orders' || option === 'Category') && <Dashboard />}
          {option === 'AddProducts' && <AddProdcts />}
          {option === 'ProductList' && <ProductList />}
          {option === 'CategoryList' && <ProductCategory />}
          {option === 'UserList' && <UserList />}
          {option === 'OrderList' && <OrderList />}
          {option === 'profile' && <Profile />}
        </>
      )}
      {userRole === 'seller' && (
        <>
          {(option === 'seller-dashBoard' || option === 'SellerProducts') && <DashBord />} {/* Adjust as necessary */}
          {/* {option === 'AddSellerProduct' && <Order />}
          {option === 'AddSellerProduct' && <Users />} */}
          {option === 'seller-AddProducts' && <AddProdcts />}
          {option === 'seller-ProductList' && <Store />}
          {option === 'seller-Orders' && <Order />}
          {/* Add more seller-specific components as needed */}
        </>
      )}
    </div>
  );
}

export default PageContent;
