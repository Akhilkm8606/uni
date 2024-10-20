import React, { useEffect, useState } from 'react';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../Instance/axios';

function ProductOrderForm() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const cartItems = useSelector(state => state.cart.items) || []; // Default to an empty array

    // Find the item with the specified id
    const selectedItem = cartItems.length > 0 ? cartItems.find(item => item._id === id) : null;

    const cartId = selectedItem ? selectedItem._id : null;
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userID = user?._id;

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login", { autoClose: 1000 });
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Initialize form data
    const [formData, setFormData] = useState({
        user: userID || '',
        sellerId: selectedItem ? selectedItem.productId.userId : '',
        items: selectedItem ? [{
            product: selectedItem.productId._id,
            name: selectedItem.productId.name,
            quantity: selectedItem.quantity,
            price: selectedItem.productId.price // Use product price
        }] : [],
        totalPrice: selectedItem ? (selectedItem.productId.price * selectedItem.quantity) + 20 : '', // Include shipping cost
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "totalPrice" || name === "paymentMethod") {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                shippingAddress: {
                    ...prevData.shippingAddress,
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/api/v1/orders', formData, { withCredentials: true });
            if (response.data.success) {
                if (formData.paymentMethod === 'Cash on Delivery') {
                    navigate("/success");
                } else {
                    const { success, razorpayOrder } = response.data;
                    if (success) {
                        const data = await instance.get('/api/v1/api/razorpay/key');
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
            toast.error('Failed to create order. Please try again.');
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
                            <input
                                type="text"
                                name="FullName"
                                placeholder="Enter Full Name"
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
                                placeholder="Landmark"
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
                            <input
                                type="text"
                                name="State"
                                placeholder="Enter State"
                                value={formData.shippingAddress.State}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
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
                        <button type="submit" className="submit-btn">Create Order</button>
                    </form>
                </Col>
                <Col className='ordered-item'>
                    <div className='item-details'>
                        {selectedItem && (
                            <div>
                                <div className='item-img'>
                                    <img
                                        src={selectedItem.productId.images[0] || 'https://via.placeholder.com/150'} // Fallback image
                                        alt={selectedItem.productId.name}
                                        className="card-img-top"
                                    />
                                    <p>{selectedItem.productId.name}</p>
                                </div>
                                <div className='details'>
                                    <p>Quantity: <span>{selectedItem.quantity}</span></p>
                                    <p>Amount: <span>₹{selectedItem.productId.price * selectedItem.quantity}</span></p>
                                    <p>Shipping Amount: <span>₹20</span></p>
                                    <h4>Total Price: ₹{(selectedItem.productId.price * selectedItem.quantity) + 20}</h4>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
}

export default ProductOrderForm;
