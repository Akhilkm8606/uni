import React, { useState } from 'react';
import '../adminDashBoard/style.css';
import { FaCircleUser, FaShopify, FaUser } from "react-icons/fa6";
import { IoExit, IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import { IoMdHome, IoMdNotifications } from 'react-icons/io';
import { userLogOut } from '../Redux/Slice/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header({ handleOptionClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const [profileState, setProfileState] = useState({
    card: false,
    msg: false,
    nty: false,
  });

  const handleLogOut = async () => {
    try {
      await dispatch(userLogOut()); // Ensure this dispatch function returns a promise
      console.log('Logged out');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfile = (section) => {
    setProfileState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className='PanelHeader'>
      <div className='profile'>
        <h2>UNIFIED - CART</h2>
        <span><FaShopify /></span>
      </div>
      <div className='header-input'>
        <input type="search" name="Search" id="Search" placeholder='Search' aria-label="Search" />
        <IoSearchOutline className='searchIcon' />
      </div>
      <div className='header-right'>
        <Link to={"/"}><IoMdHome className='icon-Home' /></Link>

        <AiOutlineMail onClick={() => handleProfile('msg')} className='icon-user' />
        {profileState.msg && <div className='messages'>Message Section</div>}

        <IoMdNotifications onClick={() => handleProfile('nty')} className='icon-user' />
        {profileState.nty && <div className='notification'>Notification Section</div>}

        <FaCircleUser onClick={() => handleProfile('card')} className='icon-user' />
        {profileState.card && (
          <div className='profile_setting'>
            <h4>User Options</h4>
            <Link className='profileLinks' onClick={() => handleOptionClick("/MyAccount")}><FaUser /> Profile</Link>
            <Link className='profileLinks' to="/settings"><IoSettingsOutline /> Settings</Link>
            <Link className='profileLinks' to="#" onClick={handleLogOut}><IoExit /> Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
