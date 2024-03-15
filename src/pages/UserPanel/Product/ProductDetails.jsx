import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Access the product ID from the URL params
  const product = useSelector(state => state.product.products);
  console.log(product,'hjhj');

  useEffect(() => {
    dispatch(getProductDetails(id)); // Dispatch the action to fetch product details
  }, [dispatch, id]);

  return (
   
      
    <>
      
      {product && (
   
        <div className='productdetail-container'>
         <div className='product-content'>
          <Carousel className='media'
          >
  {product.images.map((image, index) => (
    <img key={index+1} src={`http://localhost:5000/uploads/${image}`} alt={product.name} />
    
  ))}
  
</Carousel>

          
          {/* Add more product details as needed */}
        </div>
        <div className='product-details'>

          <h2>{product.name}</h2> {/* Access the name property directly */}
          
          <p>  <span>Price:</span> {product.price}</p>
          <p> <span>Rating:</span> </p>
          <p> <span>Stock: </span>{product.quantity}</p>
          <p><span>Description:</span> {product.description}</p>
          <p> <span>Features:</span> {product.features}</p>
          <div className='product-btn'>
            <button className='btns'>Add Cart</button>
            <button className='btns'>Buy</button>
            
          </div>
          <div className="shipping-info">
          <h3>Shipping Information</h3>
          <p>Estimated Delivery Time: {product.estimatedDeliveryTime}</p>
          <p>Shipping Method: {product.shippingMethod}</p>
          <p>Shipping Cost: {product.shippingCost}</p>
          <p>Free Shipping: {product.freeShipping ? 'Yes' : 'No'}</p>
          <p>Shipping Restrictions: {product.shippingRestrictions}</p>
        </div>
  
          </div>
          </div>
       
        
       
      )}
      </>
  );
}

export default ProductDetails;
