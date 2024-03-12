import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthentic } from '../../Redux/Slice/user';
import axios from 'axios';
import '../form/style.css';
import UserSignUp from './UserSignUp';

function UserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userRole = useSelector(state => state.auth.user?.role);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            }, { withCredentials: true });
            
            if (response && response.data) {
                if (response.data.success) {
                    dispatch(userAuthentic({
                        user: response.data.user,
                        token: response.data.token,
                    }));
                    toast.success(response.data.msg);
                    handleRedirect(response.data.user.role);
                } else {
                    toast.error(response.data.msg);
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(error.response?.data?.message || "An error occurred while logging in.");
        }
    }

    const handleRedirect = (role) => {
        if (role === "admin") {
            navigate('/admin');
        } else if (role === "seller") {
            navigate('/seller');
        } else if (role === "user") {
            navigate('/');
        } else {
            navigate('/'); // Fallback redirection
        }
    }

    return (
        <div className='registration-container'>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>LogIn</h2>
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
