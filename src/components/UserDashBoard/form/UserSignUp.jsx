import React, { useState,useDispatch } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import '../form/style.css';
import { GiLaurelCrown } from 'react-icons/gi';

function UserSignUp() {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    }

    const [focus, setFocus] = useState({    
        errName: false,
        errEmail: false,
        errAddress: false,
        errphone: false,
        errPass: false,
        errCpass: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, phone, address, password, confirmPassword } = input;
       
        try {
            const response = await axios.post("http://localhost:5000/user", {
                username,
                email,
                phone,
                address,
                password,
                confirmPassword
            });
            if (response && response.data) {
                if (response.data.success) {
                    toast.success(response.data.message, {
                        autoClose: 3000,position:"top-center"
                    });
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000)
                    })
                    navigate("/login")
                } else {
                    toast.error(response.data.msg),{
                        autoClose: 3000,position:"top-center"
                    };
                }
            } 
            dispatch
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response.data.message,{
                autoClose: 3000,position:"top-center"
            });
        }
    }

    return (
        <div className='registration-container'>
            <div className='registration'>
                <div className='log-head'>
                    <h2>UNIFIED CART</h2>
                    <p>
                        Elevate Your Shopping Journey with Us
                        <span><GiLaurelCrown className='tag-icon' /></span>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <span>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            id='userName'
                            className='form-control'
                            pattern="^(?=.*[A-Za-z])[A-Za-z\d]{4,16}$"
                            onChange={handleChange}
                            onBlur={() => setFocus({ ...focus, errName: true })}
                            value={input.username}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            id='email'
                            placeholder='email'
                            className='form-control'
                            onChange={handleChange}
                            onBlur={() => setFocus({ ...focus, errEmail: true })}
                            value={input.email}
                            required
                        />
                    </span>
                    <div className="input-wrapper error">
                        <span className='error'>{focus.errName && !input.username.match(/^(?=.*[A-Za-z])[A-Za-z\d]{4,16}$/) ? 'Username should have 4-16 characters.' : ''}</span>
                        <span className='error'>{focus.errEmail && !input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Enter a valid email address.' : ''}</span>
                    </div>
                    
                    <span>
                        <input
                            type="text"
                            name="address"
                            id='address'
                            placeholder='Address'
                            className='form-control'
                            onChange={handleChange}
                            onBlur={() => setFocus({ ...focus, errAddress: true })}
                            value={input.address}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            id='phone'
                            placeholder='Phone Number'
                            className='form-control'
                            pattern="^[0-9]{10}$"
                            onChange={handleChange}
                            onBlur={() => setFocus({ ...focus, errphone: true })}
                            value={input.phone}
                            required
                        />
                    </span>
                    <div className="input-wrapper error">
                        <span className='error'>{focus.errAddress && !input.address.match(/^(?=.*[A-Za-z])[A-Za-z\d]{4,16}$/) ? 'Address is required.' : ''}</span>
                        <span className='error'>{focus.errphone && !input.phone.match(/^[0-9]{10}$/) ? 'Enter a valid phone number.' : ''}</span>
                    </div>
                  

                    <span>
                        <input
                            type="password"
                            name="password"
                            id='password'
                            placeholder='Password'
                            className='form-control'
                            onChange={handleChange}
                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$"
                            onBlur={() => setFocus({ ...focus, errPass: true })}
                            value={input.password}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            id='confirmPassword'
                            className='form-control'
                            onChange={handleChange}
                            onBlur={() => setFocus({ ...focus, errCpass: true })}
                            pattern={input.password}
                            value={input.confirmPassword}
                            required
                        />
                    </span>
                    <div className="input-wrapper error">
                        <span className='error'>{focus.errPass && !input.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/) ? 'Password must have 8 characters and include at least 1 uppercase, 1 digit and 1 special character.' : ''}</span>
                        <span className='error'>{focus.errCpass && input.confirmPassword !== input.password ? 'Passwords do not match.' : ''}</span>
                    </div>
                    <button className='btn' type="submit">Signup</button>
                    <div className='bottom'>
                        <p>Already have an account? </p>
                        <Link className='btn' to="/login">Log In </Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserSignUp;
