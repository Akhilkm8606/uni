import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Payment.css'; // Import the CSS file for styling
import { Col, Row } from 'react-bootstrap';
import { ReactComponent as PaymentIcon } from '../../../assets/undraw_online_payments_re_y8f2.svg';

function Payment() {
    
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    console.log(orderDetails);

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/orders/${id}`);
                setOrderDetails(response.data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        }
        fetchOrderDetails();
    }, [id]);

    
    const handlePayment = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/orders/checkout/${id}`);
            const { success, razorpayOrder } = response.data;

            if (success) {
                const data = await axios.get('http://localhost:5000/api/razorpay/key');
                const options = {
                    "key": data.key_id,
                    "amount": razorpayOrder.amount,
                    "currency": "INR",
                    "name": "Acme Corp",
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": razorpayOrder.id,
                    "callback_url": "http://localhost:5000/api/paymentVerification",
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
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (


        <div className="payment-container">
            <div className="payment-header">
                <h2>Complete Your Payment</h2>
            </div>
            <Row className="payment-row">
                <Col  className="payment-col-1">
                    <div>
                        <PaymentIcon className='pay-svg' />
                    </div>
                </Col>

                <Col className='payment-details-col'>

                    {orderDetails && (
                        <div className="payment-details">
                            <h3>Order Summary</h3>
                            <div className="order-items">
                                {orderDetails && orderDetails.items.map(item => (
                                    <div key={item._id} className="item">
                                        <p>Name: {item.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: {item.price}</p>
                                    </div>
                                ))}
                            </div>                <div className="shipping-details">
                                <h3>Shipping Address :</h3>
                                <ul>
                                    <li>Full Name: {orderDetails.shippingAddress.FullName}</li>
                                    <li>Address: {orderDetails.shippingAddress.Address}</li>
                                    <li>City: {orderDetails.shippingAddress.City}</li>
                                    <li>State: {orderDetails.shippingAddress.State}</li>
                                    <li>Zip Code: {orderDetails.shippingAddress.ZipCode}</li>
                                </ul>
                            </div>
                            <p className="total-amount">Total Amount: {orderDetails.totalPrice}</p>

                        </div>
                    )}

                </Col>          

            </Row>
            <div className='btn-col'>
                    <button className="pay-now-btn" onClick={handlePayment}>Pay Now</button>

                </div>

        </div>


    );
}

export default Payment;
