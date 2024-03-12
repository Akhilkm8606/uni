import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import { userAuthentic } from '../../Redux/Slice/user';
import axios from 'axios';
import '../form/style.css';

function UserSignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user', {
                username,
                email,
                address,
                phone,
                password,
                confirmPassword,
            });
            console.log(response);

            if (response && response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='registration-container'>
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='Fullname' />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                <input type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder='Mobile Number' />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                <button className='btn' type="submit">Signup</button>
                <div className='bottom'>
                    <p>Already have an account? </p>
                    <Link className='btn' to="/login">Log In </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UserSignUp;
