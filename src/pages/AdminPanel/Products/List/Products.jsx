import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import ProductList from './ProductList';
import ProductCategory from '../Categories/ProductCateGory';
import AddProduct from '../Add/AddProduct';

function Products() {
  const [showComponent, setShowComponent] = useState('products');

  const handleComponentClick = (value) => {
    setShowComponent(value);
  };

  return (
    <>
      <Row className='page-list'>
        <button value='products' onClick={() => handleComponentClick('products')}>PRODUCTS</button>
        {/* You can add more buttons for other components */}
      </Row>
      <div className='product-page'>
        {showComponent === 'products' && <ProductList onAddProductClick={() => handleComponentClick('addProduct')} />}
        {showComponent === 'category' && <ProductCategory />}
        {showComponent === 'addProduct' && <AddProduct />}
        {/* Add more conditions for other components */}
      </div>
    </>
  );
}

export default Products;
