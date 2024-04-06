// PageContent.jsx
import React from 'react';
import '../adminDashBoard/style.css';
import ProductList from '../../pages/AdminPanel/Products/List/ProductList'; // Ensure this import is correct
import Orders from '../../pages/AdminPanel/Orders'; // Ensure this import is correct
import Dashboard from '../../pages/AdminPanel/Dashboard';
import Profile from '../../pages/AdminPanel/Profile';
import AddProdcts from '../../pages/AdminPanel/Products/Add/AddProduct';
// import Breadcrumb from './Breadcrumbs';
import ProductCategory from '../../pages/AdminPanel/Products/Categories/ProductCateGory';
import UserList from '../../pages/AdminPanel/Users/UserList';
import SellerList from '../../pages/AdminPanel/Users/SellerList';

function PageContent({ option }) {

  // const getBreadcrumb = () => {
  //   switch (option) {
  //     case 'Admin-dashBoard':
  //       return ['Dashboard'];
  //     case 'Products':
  //       return ['Dashboard', 'Products'];
  //     case 'AddProducts':
  //       return ['Dashboard', 'Products', 'Add Product'];
  //     case 'Users':
  //       return ['Dashboard', 'Users'];
  //     case 'Seller':
  //       return ['Dashboard', 'Users', 'Seller'];
  //     case 'Orders':
  //       return ['Dashboard', 'Orders'];
  //     default:
  //       return [];
  //   }
  // };

  // const breadcrumbs = getBreadcrumb();
  return (
    
     <div className='PanelPages'>
      {/* <div>
      <Breadcrumb crumbs={breadcrumbs} />

      </div> */}
  

      {(option === 'Admin-dashBoard' || option === 'Products' || option === 'Users' || option === 'Orders' || option === 'Category') && <Dashboard /> }      {/* {option === 'Products' && <Dashboard />} */}
      {option === 'AddProducts' && <AddProdcts />}
      {option === 'ProductList' && <ProductList />}
      {option === 'Categorylist' && <ProductCategory />}
      {option === 'UserList' && <UserList />}
      {option === 'SellerList' && <SellerList />}
      {option === 'Orders' && <Orders />}
      {option === 'profile' && <Profile />}
       
    </div>
  
  );
}

export default PageContent;
