import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts, getProducts } from '../../../../actions/ProductAction';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import Loader from '../Loader/Loader';
import './ProductCard.css';

function ProductCard() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getProducts());
    // Clear products when the component unmounts to avoid stale data
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  const displayedProducts = products.slice(0, 8);

  // Helper function to extract public ID from a full Cloudinary URL
  const getImagePublicId = (imageUrl) => {
    // Assuming Cloudinary URLs end with the public ID
    const urlParts = imageUrl.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <h3>FEATURED PRODUCTS</h3>
          <div className="products-container">
            {Array.isArray(displayedProducts) && displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <div className="product-card" key={index}>
                  <Link className='link' to={`/product/${product._id}`}>
                    <Card className='cards'>
                      <div className='media-img'>
                        <img
                          className='p-img'
                          src={
                            product.images[0]
                              ? product.images[0].startsWith('http')
                                ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(product.images[0])}`
                                : `https://res.cloudinary.com/dbyfurx53/image/upload/${product.images[0]}`
                              : 'https://via.placeholder.com/150' // Fallback image
                          }
                          alt={product.name}
                        />
                      </div>
                      <div className='content'>
                        <p>{product.name}</p>
                        <span>{`Price : ₹${product.price}`}</span>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
