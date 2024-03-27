import React from 'react';
import { useSearchParams } from 'react-router-dom';
// import Lottie from 'lottie-web'; // Import Lottie for rendering animated SVGs

import animationData from '../../../assets/successfully-done.json'; // Import the animation data
import Lottie from 'react-lottie-player';

function PaymentSuccess() {
    const searchParams = useSearchParams()[0];
    const referenceNum = searchParams.toString();
    const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Configuration options for the Lottie animation
   

    return (
        <div style={style}>
 <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: 150, height: 150 }}
    />            <h3>Payment completed successfully</h3>
            <p>Reference Number: {referenceNum}</p>
        </div>
    );
}

export default PaymentSuccess;
