import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/ProductAction';
import { useParams } from 'react-router-dom';
import './Cart.css'
import { IoShieldCheckmark } from "react-icons/io5";


function Cart() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Access the product ID from the URL params
  const product = useSelector(state => state.product.products);
  console.log(product, 'hjhj');

  useEffect(() => {
    dispatch(getProductDetails(id)); // Dispatch the action to fetch product details
  }, [dispatch, id]);

  return (
    <div className='cart-container'>
      {product && (
        <div >
          <div className='cart-content'>
            <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} />
            <div className='details'>
              <h2>{product.name}</h2> {/* Access the name property directly */}
              <p>  <span>Price:</span> {product.price}</p>
            </div>
          </div>
        </div>
      )}
      <div ><div className='div'>
        fhhh
      </div>
      <div >
      
        <p>
        <span>
       <IoShieldCheckmark/>
       </span>
        Safe and Secure Payments.Easy returns.100% <br/> Authentic products.
        </p>
      </div></div>
      
    </div>
  );
}
export default Cart