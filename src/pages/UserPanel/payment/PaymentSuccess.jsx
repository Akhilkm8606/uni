import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import animationData from '../../../assets/successfully-done.json'; // Import the animation data
import Lottie from 'react-lottie-player';

function PaymentSuccess() {
    const searchParams = useSearchParams()[0];
    const referenceNum = searchParams.toString();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds

    // Redirect to /products after countdown reaches 0
    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1); // Decrease countdown every second
            } else {
                navigate('/products'); // Redirect to /products when countdown reaches 0
            }
        }, 1000);

        // Clean up the timeout on component unmount
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    const style = `
        .payment-success-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
            align-items: center;
            padding: 0 20px; /* Add some padding for better readability on small screens */
        }

        @media screen and (max-width: 768px) {
            .payment-success-container {
                gap: 5px;
            }
        }   

        @media screen and (max-width: 480px) {
            .payment-success-container {
                gap: 3px;
            }
        }
    `;

    return (
        <div style={{ height: '100vh' }}>
            <style>{style}</style>
            <div className="payment-success-container">
                <Lottie
                    loop
                    animationData={animationData}
                    play
                    style={{ width: 150, height: 150 }}
                />
                <h3>Payment completed successfully</h3>
                <p>Reference Number: {referenceNum}</p>
                <p>You will be redirected to the products page in {countdown} seconds...</p>
            </div>
        </div>
    );
}

export default PaymentSuccess;
