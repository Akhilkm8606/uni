import React, { useEffect, useState } from 'react';
import '../Profile/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instance from '../../../../Instance/axios';
import EditProfile from './EditProfile'; // Adjust the import path as necessary
import { Button } from '@mui/material';

function Profile() {
  const products = useSelector(state => state.data.products);
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchOrdersData = async () => {
    try {
      if (isAuthenticated) {
        const response = await instance.get(`/api/v1/orderlist/${user._id}`, {
          withCredentials: true
        });
        setOrders(response.data.orders);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching Order data:', error);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, [isAuthenticated, user, navigate]);

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className='pm'>
      {isAuthenticated ? (
        <div>
          <div className='pp'>
            <img src="https://source.unsplash.com/random/?superbike" alt="" />
          </div>
          <div className='d'>
            <div>
              <h3>{user.username}</h3>
              <p>{user.phone}</p>
              <h5>{user.email}</h5>
              <span className='edit'>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              </span>
            </div>
          </div>

          <hr />

          <div className='ps3'>
            <h1>Orders</h1>
          </div>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-item">
                  {order.items.map(item => {
                    const product = products.find(product => product._id === item.product);
                    if (product) {
                      return (
                        <div key={item._id} className="product-item">
                          <Link to={`/product/${product._id}`}>
                            <img
                              src={
                                product.images[0]
                                  ? product.images[0].startsWith('http')
                                    ? product.images[0] // Use the image URL as is
                                    : `http://localhost:5000/uploads/${product.images[0]}` // Local server path
                                  : 'https://via.placeholder.com/150' // Fallback image
                              }
                              className="product-image"
                              alt={product.name}
                            />
                          </Link>
                          <p>{product.name}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div>
                    <h2>Order ID: {order._id}</h2>
                    <p>Total Price: {order.totalPrice}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Payment Status: {order.paymentStatus}</p>
                    <p>Shipment Status: {order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <h1>Your Order History is Empty</h1>
              <p>You haven't placed any orders yet!</p>
            </div>
          )}

          <EditProfile open={openDialog} handleClose={handleCloseDialog} user={user} />
        </div>
      ) : (
        <div>
          <h1>Please log in to view your profile and orders.</h1>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
