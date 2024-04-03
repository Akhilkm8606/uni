import React from 'react';
import { useSearchParams } from 'react-router-dom';
import animationData from '../../../assets/successfully-done.json'; // Import the animation data
import Lottie from 'react-lottie-player';

function PaymentSuccess() {
    const searchParams = useSearchParams()[0];
    const referenceNum = searchParams.toString();
    
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
            </div>
        </div>
    );
}

export default PaymentSuccess;
