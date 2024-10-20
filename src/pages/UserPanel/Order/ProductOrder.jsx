import React, { useEffect, useState } from 'react';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../Instance/axios';

const ProductOrderForm = () => {
    const location = useLocation();
    const dispatch = useDispatch(); // Keep this if you'll use dispatch later
    const { id } = useParams();
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    // State definitions
    const [formData, setFormData] = useState({
        user: user?._id || '',
        sellerId: '',
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

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login", { autoClose: 1000 });
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch the selected item using useEffect
    useEffect(() => {
        const selectedItem = cartItems.find(item => item._id === id);
        if (selectedItem) {
            setFormData(prev => ({
                ...prev,
                sellerId: selectedItem.productId.userId,
                items: [{
                    product: selectedItem.productId._id,
                    name: selectedItem.productId.name,
                    quantity: selectedItem.quantity,
                    price: selectedItem.price
                }],
                totalPrice: selectedItem.amount,
            }));
        }
    }, [cartItems, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "totalPrice" || name === "paymentMethod") {
            setFormData({ ...formData, [name]: value });
        } else {
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
                    }
                }
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const getImagePublicId = (imageUrl) => {
        const urlParts = imageUrl.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1];
        const [publicId] = fileNameWithExtension.split('.');
        return publicId;
    };

    return (
        <div className="order-container">
            <h2>Create Order</h2>
            <Row className='Order-row'>
                <Col>
                    <form onSubmit={handleSubmit} className="form">
                        <label>Shipping Address:</label>
                        <div className="shipping-address">
                            {/* Shipping Address Fields */}
                            <input type="text" name="FullName" placeholder="Enter FullName" value={formData.shippingAddress.FullName} onChange={handleChange} required />
                            <input type="text" name="MobileNumber" placeholder="Enter Mobile Number" value={formData.shippingAddress.MobileNumber} onChange={handleChange} required />
                            <input type="text" name="Address" placeholder="Enter Address" value={formData.shippingAddress.Address} onChange={handleChange} required />
                            <input type="text" name="Apartment" placeholder="Enter Apartment" value={formData.shippingAddress.Apartment} onChange={handleChange} required />
                            <input type="text" name="LandMark" placeholder="LandMark" value={formData.shippingAddress.LandMark} onChange={handleChange} required />
                            <input type="text" name="City" placeholder="Enter City" value={formData.shippingAddress.City} onChange={handleChange} required />
                            <input type="text" name="State" placeholder="Enter State" value={formData.shippingAddress.State} onChange={handleChange} required />
                            <input type="number" name="ZipCode" placeholder="Enter Zip Code" value={formData.shippingAddress.ZipCode} onChange={handleChange} required />
                        </div>

                        <label>Payment Method:</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
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
                        {formData.items.length > 0 && (
                            <div>
                                <div className='item-img'>
                                    <img
                                        src={
                                            formData.items[0].productId?.images[0]
                                                ? formData.items[0].productId.images[0].startsWith('http')
                                                    ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(formData.items[0].productId.images[0])}`
                                                    : `https://res.cloudinary.com/dbyfurx53/image/upload/${formData.items[0].productId.images[0]}`
                                                : 'https://via.placeholder.com/150' // Fallback image
                                        }
                                        alt={formData.items[0].name}
                                        className="card-img-top"
                                    />
                                    <p>{formData.items[0].name}</p>
                                </div>
                                <div className='details'>
                                    <p>Quantity: <span>{formData.items[0].quantity}</span></p>
                                    <p>Amount: <span>{formData.items[0].price}</span></p>
                                    <p>Shipping Amount: <span>20</span></p>
                                    <h4>Total Price: {parseFloat(formData.items[0].price) + 20}</h4>
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
