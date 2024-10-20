import React, { useEffect, useState } from 'react';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../Instance/axios';

function ProductOrderForm() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    // Accessing the items passed from the Cart
    const { items } = location.state || {};
    
    // Check if items exist
    if (!items || items.length === 0) {
        toast.error("No items selected for purchase.", {
            autoClose: 1000,
        });
        navigate('/cart'); // Redirect to cart if no items
        return null;
    }

    // Extract user ID
    const userID = user?._id;

    if (!isAuthenticated) {
        toast.error("Please login", {
            autoClose: 1000,
        });
        navigate('/login');
    }

    // Initializing form data
    const [formData, setFormData] = useState({
        user: userID || '',
        sellerId: items[0].productId.userId, // Assuming all items have the same seller
        items: items.map(item => ({
            product: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price,
        })),
        totalPrice: items.reduce((total, item) => total + item.amount, 0) + 20, // Including shipping
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
            const response = await instance.post('/api/v1/orders', formData, {
                withCredentials: true
            });

            if (response.data.success) {
                if (formData.paymentMethod === 'Cash on Delivery') {
                    navigate("/success");
                } else {
                    const { success, razorpayOrder } = response.data;
                    if (success) {
                        const data = await instance.get('/api/v1/api/razorpay/key');

                        // Check if Razorpay script is loaded
                        if (typeof window.Razorpay !== 'undefined') {
                            const options = {
                                "key": data.key_id,
                                "amount": razorpayOrder.amount,
                                "currency": "INR",
                                "name": "Acme Corp",
                                "description": "Test Transaction",
                                "image": "https://example.com/your_logo",
                                "order_id": razorpayOrder.id,
                                "callback_url": "https://unified-cart-server.vercel.app/api/v1/api/paymentVerification",
                                "prefill": {
                                    "name": "Gaurav Kumar",
                                    "email": "gaurav.kumar@example.com",
                                    "contact": "9000090000"
                                },
                                "notes": {
                                    "address": "Razorpay Corporate Office"
                                },
                                "theme": {
                                    "color": "#3399cc"
                                }
                            };

                            const rzp = new window.Razorpay(options);
                            rzp.open();
                        } else {
                            console.error('Razorpay SDK is not loaded.');
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="order-container">
            <h2>Create Order</h2>
            <Row className='Order-row'>
                <Col>
                    <form onSubmit={handleSubmit} className="form">
                        <label>Shipping Address:</label>
                        <div className="shipping-address">
                            {/* ... Your shipping address inputs go here, similar to your original code ... */}
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
                        <button type="submit" className="submit-btn">Create Order</button>
                    </form>
                </Col>
                <Col className='ordered-item'>
                    <div className='item-details'>
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className='item-img'>
                                    <img
                                        src={
                                            item.productId.images[0]
                                                ? item.productId.images[0].startsWith('http')
                                                    ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(item.productId.images[0])}`
                                                    : `https://res.cloudinary.com/dbyfurx53/image/upload/${item.productId.images[0]}`
                                                : 'https://via.placeholder.com/150' // Fallback image
                                        }
                                        alt={item.productId.name}
                                        className="card-img-top"
                                    />
                                    <p>{item.productId.name}</p>
                                </div>

                                <div className='details'>
                                    <div>
                                        <p>{item._id}</p>
                                        <p>Quantity: <span>{item.quantity}</span></p>
                                        <p>Amount: <span>{item.amount}</span></p>
                                        <p>Shipping Amount: <span>20</span></p>
                                    </div>
                                    <h4>Total Price: {formData.totalPrice}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            <ToastContainer />
        </div>
    );
}

export default ProductOrderForm;
