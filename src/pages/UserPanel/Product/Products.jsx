import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/ProductAction';
import { Card, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {  CardMedia } from '@mui/material';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';
import '../../../components/UserDashBoard/Layout/Product/ProductCard.css';

function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);


  return (
    <>
    
      {loading ? (
        <Loader />
      ) : (
       
        <div className='container'>
          <Row>
            <h3>PRODUCTS</h3>
          </Row>
          <div className='products-container'>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <div className='product-card' key={index}>
                  <Link className='link' to={`/product/${product._id}`}>
                  <Card className='cards'>
                      <CardMedia className='media-imges'
                        component="img"
                        image={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt={product.name}
                      />
                      
                      <div className='content'>
                        <p  component="div">
                          {product.name}
                        </p>
                       <div className='price-n-rating'>
                       <ReactStars
                          {...Option}
                          value={parseFloat(product.rating) || 0}  // Add rating value here
                          count={5} // Add total stars count here
                        />
                        <span>{`₹ : ${product.price}`}</span>
                       </div>
                      </div>
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

export default Products;
