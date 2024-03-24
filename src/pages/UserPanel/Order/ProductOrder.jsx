import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductOrderForm() {
    const location = useLocation();
  
    const { id } = useParams();
    const cartItems = useSelector(state => state.cart.items);
    
    // Find the item with the specified id
    const selectedItem = cartItems.find(item => item._id === id);
    
    console.log(selectedItem, 'kkvhgggffg');
    


    const navigate = useNavigate('')
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userID = user?._id;
    console.log(userID);

    
  
    if (!isAuthenticated) {
        toast.error("Please login", {
            autoClose: 1000,
        });
        navigate('/login')

    }
    const [formData, setFormData] = useState({
        user: userID,
        items: [],
        totalPrice: '',
        status: 'Pending',
        paymentMethod: '',
        shippingAddress: {
            FullName: '',
            MobileNumber: '',
            Address: '',
            Apartment: '',
            LandMark: '',
            City: '',
            State: '',
            ZipCode: ''
        },

    });

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login", {
                autoClose: 1000,
            });
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "totalPrice" || name === "paymentMethod") {
            // Handle user, totalPrice, and paymentMethod directly under formData
            setFormData({ ...formData, [name]: value });
        } else {
            // Handle shippingAddress fields
            setFormData({
                ...formData,
                shippingAddress: {
                    ...formData.shippingAddress,
                    [name]: value
                }
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const response = await axios.post('http://localhost:5000/orders', formData, {
                withCredentials: true
            });
            console.log(response.data);
            // Reset form after successful submission
            setFormData({
                user: userID,
                items: [],
                totalPrice: '',
                status: 'Pending',
                shippingAddress: '',
                paymentMethod: ''
            });


        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    console.log(formData);

    return (
        <div className="order-container">
            <h2>Create Order</h2>
            <Row className='Order-row'>
                <Col>
                    <form onSubmit={handleSubmit} className="form">

                        <label>Total Price:</label>
                        <input
                            type="number"
                            name="totalPrice"
                            value={formData.totalPrice}
                            onChange={handleChange}
                            required
                        />
                        <label>Shipping Address:</label>
                        <div className="shipping-address">
                            <input
                                type="text"
                                name="FullName"
                                placeholder="Enter FullName"
                                value={formData.shippingAddress.FullName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="MobileNumber"
                                placeholder="Enter Mobile Number"
                                value={formData.shippingAddress.MobileNumber}
                                onChange={handleChange}
                                required
                            />


                            <input
                                type="text"
                                name="Address"
                                placeholder="Enter Address"
                                value={formData.shippingAddress.Address}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="Apartment"
                                placeholder="Enter Apartment"
                                value={formData.shippingAddress.Apartment}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="LandMark"
                                placeholder="LandMark"
                                value={formData.shippingAddress.LandMark}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="City"
                                placeholder="Enter City"
                                value={formData.shippingAddress.City}
                                onChange={handleChange}
                                required
                            />
                            <div>
                                <input
                                    type="text"
                                    name="State"
                                    placeholder="Enter State"
                                    value={formData.shippingAddress.State}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <input
                                type="number"
                                name="ZipCode"
                                placeholder="Enter Zip Code"
                                value={formData.shippingAddress.ZipCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <label>Payment Method:</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                        <button type="submit" className="submit-btn" >Create Order</button>
                    </form>
                </Col>
                <Col className='ordered-item'>
                    <div className='item-details'>
                    {selectedItem && (
  <div>
    <div className='item-img'>
      <img src={`http://localhost:5000/uploads/${selectedItem.productId.images[0]}`} alt={selectedItem.productId.name} className="card-img-top" />
      <p>{selectedItem.productId.name}</p>
    </div>
    <form action="">
      <span>
        <input type="text" placeholder='' /> <button>Apply</button>
      </span>
    </form>
    <div>
      <p>{selectedItem._id}</p>
      <p>Shipping</p>
      <p>Total</p>
    </div>
  </div>
)}

                       
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ProductOrderForm;
