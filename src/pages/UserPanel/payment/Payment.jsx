import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Payment() {
    const {id}= useParams();
    console.log(id);
    const [orderDetails, setOrderDetails] = useState(null);

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
        console.log(razorpayOrder);
        if (success) {
          const options = {
            key: '', // Replace with your Razorpay key
            amount: razorpayOrder.amount,
            currency: 'INR',
           
            order_id: razorpayOrder.id,
            handler: async function (response) {
              // Handle the payment response here
              const paymentId = response.razorpay_payment_id;
              const signature = response.razorpay_signature;
              await axios.post('http://localhost:5000/orders/payment', { orderId, paymentId, signature });
              // Redirect or show a success message to the user
            },
            prefill: {
              name: orderDetails.user.name,
              email: orderDetails.user.email,
            },
            notes: {
              address: orderDetails.shippingAddress.Address,
            },
            theme: {
              color: '#F37254',
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
    };
  
    return (
      <div>
        {orderDetails && (
          <div>
            <p>Total Amount: {orderDetails.totalPrice}</p>
            <button onClick={handlePayment}>Pay Now</button>
          </div>
        )}
      </div>
    );
  }

export default Payment