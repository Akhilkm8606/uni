import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import AddProdcts from './ProductList';
import ProductList from './ProductList';
import ProductCateGory from './ProductCateGory';
import AddProduct from './AddProduct';

function Products() {

  
  const [showComponent, setShowComponent] = useState('products');


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns date in 'mm/dd/yyyy' format
  };

  const handleComponentClick = (value) => {
    setShowComponent(value);
  };

  return (
    <>
      <Row className='page-list'>
        <button value='products' onClick={(e) => handleComponentClick(e.target.value)}>PRODUCTS</button>
        <button value='category' onClick={(e) => handleComponentClick(e.target.value)}>CATEGORY</button>
        <button value='addProduct' onClick={(e) => handleComponentClick(e.target.value)}>ADD PRODUCTS</button>
        <button>EDIT PRODUCTS</button>
      </Row>
      <div className='product-page'>
        {showComponent === 'products' && (
         <ProductList/>
        )}

        {showComponent === 'category' && (
          <ProductCateGory/>
         
        )}

        {showComponent === 'addProduct' && <AddProduct />}
      </div>
    </>
  );
}

export default Products;
