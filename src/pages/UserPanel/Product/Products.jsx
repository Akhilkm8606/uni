import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/ProductAction';
import { Card, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { CardContent, CardMedia, Typography } from '@mui/material';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';

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
                    <Card>
                      <CardMedia
                        className='media-img'
                        component='img'
                        image={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt={product.name}
                      />
                      <CardContent className='content'>
                        <Typography gutterBottom variant='h5' component='div'>
                          {product.name}
                        </Typography>
                        <ReactStars count={5} value={product.rating} />
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

export default Products;
