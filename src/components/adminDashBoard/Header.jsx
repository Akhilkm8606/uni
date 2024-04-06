import React, { useState } from 'react';
import '../adminDashBoard/style.css';
import { FaCircleUser, FaShopify, FaUser } from "react-icons/fa6";
import { IoExit, IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import { IoMdHome, IoMdNotifications } from 'react-icons/io';
import { userLogOut } from '../Redux/Slice/user';
import { useDispatch, useSelector } from 'react-redux';
import Theme from '../UserDashBoard/Layout/Theme';

function Header({ handleOptionClick }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  

  const handleLogOut =()=>{
    try {
     
      dispatch(userLogOut())
      console.log('logoted');
    } catch (error) {
      console.error("Error logging out:", error);

    }
  }
 

  const [showCard, setShowCard] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showNty, setShowNty] = useState(false);

  const handleProfile = (section) => {
    switch (section) {
      case 'card':
        setShowCard(!showCard);
        break;
      case 'msg':
        setShowMsg(!showMsg);
        break;
      case 'nty':
        setShowNty(!showNty);
        break;
      default:
        setShowCard(false);
        setShowMsg(false);
        setShowNty(false);
        break;
    }
  };

  return (
    <div className='PanelHeader'>
      <div className='profile'>
        <h2>UNIFIED - CART</h2>
        <span><FaShopify /></span>
      </div>
      <div className='header-input'>
        <input type="search" name="Search" id="Search" placeholder='Search' />
        <IoSearchOutline className='searchIcon' />
      </div>
      <div className='header-right'>
      <Link to={"/"} ><IoMdHome className='icon-Home' /></Link>

        <AiOutlineMail onClick={() => handleProfile('msg')} className='icon-user' />
        {showMsg && <div className='masseges'>Message Section</div>}

        <IoMdNotifications onClick={() => handleProfile('nty')} className='icon-user' />
        {showNty && <div className='notification'>Notification Section</div>}

        <FaCircleUser onClick={() => handleProfile('card')} className='icon-user' />
        {showCard && (
          <div className='profile_setting'>
            <h4>User Options</h4>
            <Link className='profileLinks'  onClick={() => handleOptionClick("profile")}><FaUser /> Profile</Link>
            <Link className='profileLinks' to={"/"} ><IoSettingsOutline /> Settings</Link>
            <Link className='profileLinks' to={""} onClick={handleLogOut} > <IoExit /> Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
