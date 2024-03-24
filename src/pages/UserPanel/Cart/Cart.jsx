import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import { Row, Table } from 'react-bootstrap';
import { getCart,removeCart } from '../../../components/Redux/Slice/cart';
import { MdDelete, MdEdit } from 'react-icons/md';
import { logDOM } from '@testing-library/react';

function Cart() {
  const [cart, setCart] = useState([]);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  let carts = []; // Initialize an empty array to store the IDs

cartItems && cartItems.map((item) => {
  carts.push(item._id); // Push each ID into the array
});



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
    dispatch(getCart(cart));

  }, [dispatch, isAuthenticated, user,cart, Navigate]);
  useEffect(() => {
  }, [dispatch, ]);

  // Function to increase quantity
  const increaseQuantity = (item) => {
    const updatedCart = cartItems.map(cartItem => {
      if (cartItem.productId._id === item.productId._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  // Function to decrease quantity
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cartItems.map(cartItem => {
        if (cartItem.productId._id === item.productId._id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      setCart(updatedCart);
    }
    else{
      console.log(Error);
    }
  };

  // Function to calculate the total price of an item
  const calculateTotalPrice = (item) => {
    return item.quantity * item.productId.price;
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalCartPrice = () => {
    let total = 0;
    cartItems && cartItems.forEach(item => {
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
        const index = cartItems.findIndex(item => item._id === itemId);
        if (index !== -1) {
          const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
          setCart(updatedCart);
        }
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
            {Array.isArray(cartItems) && cartItems.map((item, index) => (
              <tr key={index}>
                <td className='productcell'>
                
                  <Link className='item-link' to={`/product/${item.productId._id}`} >
                    <img src={`http://localhost:5000/uploads/${item.productId.images[0]}`} alt={item.productId.name} className="card-img-top" />
                  </Link>
                  <span>{item.productId.name}</span>
                </td>
                <td>{item.productId.price}</td>
                <td className='qty-td'>
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </td>
                <td>{calculateTotalPrice(item)}</td>
                <td><Link to={`/Order/${item._id}`}>
                  buy</Link></td>
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
