import { useParams } from 'react-router-dom';
import Header from '../../../components/adminDashBoard/Header';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/adminDashBoard/Sidebar';
import Footer from '../../../components/UserDashBoard/Layout/Footer/Footer';
import './Order-D.css';

import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import { useNavigate } from 'react-router-dom';

import instance from '../../../Instance/axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../../components/Redux/Slice/orders';
function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams(); // Access the order ID from the URL
  const [order, setOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('Admin-dashBoard');
  const users = useSelector(state => state.auth.users);
  const [customer, setCustomer] = useState(null);




  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await instance.get(`/api/v1/order/${id}`, { withCredentials: true });
        const fetchedOrder = response.data.orders;
        setOrder(fetchedOrder);
        console.log(fetchedOrder);

        if (fetchedOrder) {
          const userId = fetchedOrder.user;
          const customerDetails = users.find(user => user._id === userId);
          setCustomer(customerDetails);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchdata();
  }, [id, users]);



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option, 'option');
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await instance.put(`/api/v1/order/status/${id}`, {
        status: selectedStatus,
      }, { withCredentials: true });

      console.log('Order status updated successfully:', response.data.order);

      // Update the order state in the component
      setOrder(response.data.order);

      // Dispatch action to update the order in the Redux store
      dispatch(updateOrder(response.data.order));

      // Optionally, reload the order data or display a success message
    } catch (error) {
      console.error('Error updating order status:', error);
      setErrorMessage(error.response.data.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
    <Header />

    <Sidebar handleOptionClick={handleOptionClick} />

<div className='ord-section'>
<div className="order-detail">
      <form className='order-form' onSubmit={handleSubmit}>
        <div className='o-d-h'>
          <h2>Order Details</h2>
        </div>
        {order && (
          <div className='order-box'>
            <ul className='o-ul'>
              <li>Order ID: {order._id}</li>
              <li>Current Status: {order.status}</li>
              <li>Payment Method: {order.paymentMethod}</li>
              <li>Payment Status: {order.paymentStatus}</li>
              <li>Total Price: {order.totalPrice}</li>
            </ul>
            <div className='ordr-btn'>
              <select value={selectedStatus} className='order-stn' onChange={handleStatusChange}>
                <option value="">-- Select New Status --</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button className='subt-btn' type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Status'}
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          </div>
        )}
      </form>

      <div className='c-dtls'>
        <div className='customer-details-header'>
          <h2>Customer Details</h2>
        </div>
        {customer && (
          <div className='c-d'>
            <div className='c-top'>
              <img style={{ width: 60, height: 60, padding: 5 }} src="https://source.unsplash.com/random/?superbike" alt="" />
              <div>
                <p>{customer.username}</p>
              </div>
            </div>
            <ul className='c-ul'>
              <li>
                <span>
                  <MarkEmailReadOutlinedIcon />
                </span>
                {customer.email}
              </li>
              <li>
                <span>
                  <PhonelinkRingOutlinedIcon />
                </span>
                {customer.phone}
              </li>
            </ul>
          </div>
        )}
      </div>

     
    </div>
    <div className='s-n-p-secton'>
       <div className='shipping-address'>
        <div className='shipping-address-header'>
          <h2>Shipping Address</h2>
        </div>
        {order && (
          <div className='s-a'>
            <p>Full Name: {order.shippingAddress.FullName}</p>
            <p>Address: {order.shippingAddress.Address}</p>
            <p>Apartment: {order.shippingAddress.Apartment}</p>
            <p>City: {order.shippingAddress.City}</p>
            <p>Landmark: {order.shippingAddress.LandMark}</p>
            <p>Postal Code: {order.shippingAddress.PostalCode}</p>
          </div>
        )}
      </div>

      <div className='product-details'>
        <div className='product-details-header'>
          <h2>Product Details</h2>
        </div>
        {order && (
          <div className='p-d'>
            {order.items.map(item => (
              <div key={item._id} className='p-item'>
                <p>Product Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
</div>
    
  

    <Footer />
  </div>
);
}

 

export default OrderDetails;
