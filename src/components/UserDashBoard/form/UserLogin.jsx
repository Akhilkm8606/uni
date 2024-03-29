import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthentic } from '../../Redux/Slice/user';
import axios from 'axios';
import '../form/style.css';
import UserSignUp from './UserSignUp';
import { GiJewelCrown, GiLaurelCrown } from "react-icons/gi";

function UserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userRole = useSelector(state => state.auth.user?.role);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour < 12) {
            setGreeting('Good morning');
        } else if (currentHour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            }, { withCredentials: true });
          
            const { data } = response;
            if (data.success) {
                const { user, token } = data;
                dispatch(userAuthentic({ user, token }));
                localStorage.setItem('token', token); // Storing token in localStorage
                localStorage.setItem('user', JSON.stringify(user)); 
                toast.success(data.msg,{
                    autoClose: 3000,position:"top-center"
                });
                handleRedirect(user.role);
                // Clear form fields after successful submission
                setEmail('');
                setPassword('');
            } else {
                toast.error(data.msg,{
                    autoClose: 3000,position:"top-center"
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(error.response?.data?.message || "An error occurred while logging in.",{
                autoClose: 3000,position:"top-center"
            });
        }
    };

    useEffect(() => {
        // Check for token on component mount
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        if (token && user) {
            // Dispatch userAuthentic action with token
            dispatch(userAuthentic({user, token }));
            handleRedirect(userRole)
            // Set loading to false after authentication data is fetched
        }
    }, [dispatch]);

    const handleRedirect = (role) => {
        switch (role) {
            case "admin":
                navigate('/admin');
                break;
            case "seller":
                navigate('/seller');
                break;
            case "user":
                navigate('/');
                break;
            default:
                navigate('/');
                break;
        }
    };

    return (
        <div className='login-container'>
            <div className='login'>  
                 
                 <div className='log-head'>
                 <h2 >UNIFIED CART</h2>
               
                   
                    <p>
                    Elevate Your Shopping Journey with Us
                    <span><GiLaurelCrown className='tag-icon'/></span>
                    </p>
               

                 </div>
               
                <form onSubmit={handleSubmit}>
                    <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                    <input id='password' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    <button className='btn' type="submit">Log In</button>
                    <div className='bottom'>
                        <p>Don't have an account? </p>
                        <Link className='btn' to="/signup">Sign up</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserLogin;
