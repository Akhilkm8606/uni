import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../actions/ProductAction';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import './Product.css';
import Loader from '../Loader/Loader';

function Product() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.data);
  console.log(products ,'jhjhjh');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <>
  {loading ? (
   <Loader/>
  ):(
    <div className='container'>
    <h3>FEATURED PRODUCTS</h3>
    <div className="products-container">
      {Array.isArray(products) && products.map((product, index) => (
        <div className="product-card" key={index}>
          <Link className='link' to={`/product/${product._id}`}>
            <Card>
              <CardMedia className='media-img'
                component="img"
                
                image={`http://localhost:5000/uploads/${product.images[0]}`}
                alt={product.name}
              />
              <CardContent className='content'>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <ReactStars
                {...Option}
                  value={product.rating} // Add rating value here
                  count={5} // Add total stars count here
                />
                <span>{`₹ : ${product.price}`}</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  </div>
  )}
  
    </> 
  );
}

export default Product;
