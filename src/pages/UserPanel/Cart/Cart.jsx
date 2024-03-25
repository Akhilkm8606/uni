import React, { useEffect, useState,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import { Row, Table } from 'react-bootstrap';
import { getCart, removeCart } from '../../../components/Redux/Slice/cart';
import { MdDelete, MdEdit } from 'react-icons/md';

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  

 

  useEffect(() => {
    dispatch(getCart(cart))

  }, [dispatch,cart]);
  
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (!isAuthenticated) {
          Navigate('/login');
          return;
        }
        if (isAuthenticated && user) {
          const response = await axios.get(`http://localhost:5000/user/carts/${user._id}`, {
            withCredentials: true
          });
          setCart(response.data.userCart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();

  }, [dispatch, isAuthenticated, user, Navigate]);



  

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/cart/edit/${itemId}`, { quantity }, { withCredentials: true });
      if (response.status === 200) {
        // Update the cart state after all quantity updates are completed
        setCart(prevCart => {
          const updatedCart = prevCart.map(item => {
            if (item._id === itemId) {
              return { ...item, quantity };
            }
            return item;
          });
          return updatedCart;
        });
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  }, [setCart]);

  
  
  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  const calculateTotalCartPrice = () => {
    let total = 0;
    Array.isArray(cart)  && cart.forEach(item => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  const handleRemoveCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart/delete/${itemId}`, {
        withCredentials: true
      });
      if (response.status === 200) {
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <>
      <div className='cart-container'>
        <Table className='custom-table'>
          <h2 className='cart-head'>Shopping Cart</h2>
          <tbody className='t-body'>
            {Array.isArray(cart) && cart.map((item, index) => (
              <tr key={index}>
                <td className='productcell'>
                  <Link className='item-link' to={`/product/${item.productId._id}`} >
                    <img src={`http://localhost:5000/uploads/${item.productId.images[0]}`} alt={item.productId.name} className="card-img-top" />
                  </Link>
                  <span>{item.productId.name}</span>
                </td>
                <td>{item.productId.price}</td>
                <td className='qty-td'>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                 </td>
                <td>{calculateTotalPrice(item)}</td>
                <td>
                  <Link to={`/Order/${item._id}`}>
                    buy
                  </Link>
                </td>
                <td>
                  <MdDelete onClick={() => handleRemoveCart(item._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="total-price">
        Total Price: ${calculateTotalCartPrice()}
      </div>
    </>
  );
}

export default Cart;
