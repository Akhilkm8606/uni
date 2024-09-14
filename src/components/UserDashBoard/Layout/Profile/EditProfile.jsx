import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { userAuthentic } from '../../../Redux/Slice/user';
import instance from '../../../../Instance/axios';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.username || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone || '');
    }
  }, [user]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await instance.post(`/api/v1/updateUser/${id}`, {
        name,
        email,
        phone: phoneNumber
      }, { withCredentials: true });
      
      setMessage(response.data.message);
      
      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 3000,
          position: "top-center"
        });
        navigate('/MyAccount');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage, {
        autoClose: 3000,
        position: "top-center"
      });
    }
  };
  
  return (
    <div className="edit-profile-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="input-field"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="input-field"
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="input-field"
        />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
      <ToastContainer/>
    </div>
  );
}

export default EditProfile;
