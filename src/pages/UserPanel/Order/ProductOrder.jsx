import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './order.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../Instance/axios';

function ProductOrderForm() {
    const location = useLocation();
    const dispatch = useDispatch()

    const { id } = useParams();
    const cartItems = useSelector(state => state.cart.items);

    // Find the item with the specified id
    const selectedItem = cartItems.find(item => item._id === id);

    const cartId = selectedItem ? selectedItem._id : null;
    const navigate = useNavigate('')
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userID = user?._id;



    if (!isAuthenticated) {
        toast.error("Please login", {
            autoClose: 1000,
        });
        navigate('/login')

    }
    
    const [formData, setFormData] = useState({
        user: userID || '',
        sellerId: selectedItem ? selectedItem.productId.userId : '',
        items: selectedItem ? [{
            product: selectedItem.productId._id,
            name: selectedItem.productId.name,
            quantity: selectedItem.quantity,
            price: selectedItem.price
        }] : [],
        totalPrice: selectedItem ? selectedItem.amount : '',
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
    const [focus, setFocus] = useState({
        errName: false,
        errNumber: false,
        errAddress: false,
        errApartment: false,
        errLandmark: false,
        errState: false,
        errCity: false,
        errZipcode: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/api/v1/orders', formData, {
                withCredentials: true
            });
    
            if (response.data.success) {
                if (formData.paymentMethod === 'Cash on Delivery') {
                    alert('Order placed successfully!');
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
    
    
    const getImagePublicId = (imageUrl) => {
        const urlParts = imageUrl.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1];
        const [publicId] = fileNameWithExtension.split('.'); // Split by dot and take the first part
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
                            <span className='input-container '>
                                <input
                                    type="text"
                                    name="FullName"
                                    placeholder="Enter FullName"
                                    pattern="^[A-Za-z\s]{4,16}$"
                                    value={formData.shippingAddress.FullName}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errName: true })}

                                />
                                <span className='error'>{focus.errName && !formData.shippingAddress.FullName.match(/^[A-Za-z\s]{4,16}$/) ? 'Full name should have 4-16 characters.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="MobileNumber"
                                    pattern="^[0-9]{10}$"
                                    placeholder="Enter Mobile Number"
                                    value={formData.shippingAddress.MobileNumber}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errNumber: true })}

                                />
<span className='error'>{focus.errNumber && formData.shippingAddress.MobileNumber && !formData.shippingAddress.MobileNumber.match(/^[0-9]{10}$/) ? 'Mobile number should be 10 digits.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="Address"
                                    placeholder="Enter Address"
                                    pattern=".{5,}"
                                    value={formData.shippingAddress.Address}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errAddress: true })}

                                />
                                <span className='error'>{focus.errAddress && !formData.shippingAddress.Address.match(/.{5,}/) ? 'Address should have at least 5 characters.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="Apartment"
                                    placeholder="Enter Apartment"
                                    pattern=".{1,}"
                                    value={formData.shippingAddress.Apartment}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errApartment: true })}

                                />
                                <span className='error'>{focus.errApartment && !formData.shippingAddress.Apartment.match(/.{1,}/) ? 'Apartment field is required.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="LandMark"
                                    placeholder="LandMark"
                                    pattern=".{1,}"
                                    value={formData.shippingAddress.LandMark}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errLandmark: true })}

                                />
                                <span className='error'>{focus.errLandmark && !formData.shippingAddress.LandMark.match(/.{1,}/) ? 'Landmark field is required.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="City"
                                    placeholder="Enter City"
                                    pattern=".{2,}"
                                    value={formData.shippingAddress.City}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errCity: true })}

                                />
                                <span className='error'>{focus.errCity && !formData.shippingAddress.City.match(/.{4,}/) ? 'City field should have at least 2 characters.' : ''}</span>

                            </span>
                            <span  className='input-container '>
                                <input
                                    type="text"
                                    name="State"
                                    placeholder="Enter State"
                                    pattern=".{2,}"
                                    value={formData.shippingAddress.State}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errState: true })}

                                />
                                <span className='error'>{focus.errState && !formData.shippingAddress.State.match(/.{4,}/) ? 'State field should have at least 2 characters.' : ''}</span>

                            </span>

                            <span  className='input-container '>
                                <input
                                    type="number"
                                    name="ZipCode"
                                    placeholder="Enter Zip Code"
                                    pattern="^\d{5}$"
                                    value={formData.shippingAddress.ZipCode}
                                    onChange={handleChange}
                                    required
                                    onBlur={() => setFocus({ ...focus, errZipcode: true })}

                                />
                                <span className='error'>{focus.errZipcode && !formData.shippingAddress.ZipCode.match(/^\d{5}$/) ? 'Zip code should be 5 digits.' : ''}</span>


                            </span>

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
                                    
                                    <img
    src={
        selectedItem.productId.images[0]
            ? selectedItem.productId.images[0].startsWith('http')
                ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(selectedItem.productId.images[0])}`
                : `https://res.cloudinary.com/dbyfurx53/image/upload/${selectedItem.productId.images[0]}`
            : 'https://via.placeholder.com/150' // Fallback image
    }
    alt={selectedItem.productId.name}
    className="card-img-top"
/>
                                    <p>{selectedItem.productId.name}</p>
                                </div>

                                <div className='details'>
                                    <div>
                                        <p>{selectedItem._id}</p>

                                        <p>Quantity: <span>{selectedItem.quantity}</span></p>
                                        <p>Amount: <span>{selectedItem.amount}</span></p>
                                        <p>Shipping  Amount: <span>20</span></p>
                                    </div>
                                    <h4>Total Price : {selectedItem.amount + 20}</h4>
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
