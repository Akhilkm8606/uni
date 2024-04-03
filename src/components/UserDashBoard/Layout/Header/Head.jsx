import { Nav } from 'react-bootstrap';
import "./Home.css";
import React, { useState, useRef } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { IoIosMail, IoMdCall, IoIosLogOut, IoMdHome } from "react-icons/io";
import { CgHeart, CgMoreVertical, CgProfile, CgShoppingCart } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import {  userLogOut } from "../../../Redux/Slice/user"; // Corrected import
import Cookies from 'js-cookie'; 
import { IoExit, IoSettingsOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';
import Theme from '../Theme';

function Home() {
  const [keyword,setkeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const handleLogOut = () => {
    try {
      dispatch(userLogOut());
      Cookies.remove("token");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault(); 
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    console.log("Search keyword:", keyword);
  };

  const handleProfile = () => {
    setShowCard(!showCard);
  };

  const handleMouseLeave = (e) => {
    if (!cardRef.current.contains(e.relatedTarget)) {
      setShowCard(false);
    }
  };

  return (
    <> 
      <div id='header'>
        <Nav className='nav-Top'>
          <Link to={"/signUp"} className="top">Sign Up</Link>
          <Link to="mailto:unifiedcart@gmail.com" className="top">
            <IoIosMail className='top-icon-links' /><span>unifiedcart@gmail.com</span>
          </Link>
          <Link to="tel:0466-256644" className="top">
            <IoMdCall className='top-icon-links' /><span>0466-256644</span>
          </Link>
        </Nav>
        <Nav className='main-header'>
          <form className='search-bar' onSubmit={searchSubmitHandler}>
           <span>
           <input type="search" placeholder='Search' onChange={(e) => setkeyword(e.target.value)} />
           </span>
            <Link className='search_btn'  type='submit'>Search</Link>
          </form>
          <div to={'/'} className='logo'>
            UNIFIED CART
          </div>
          <div className='cart'>
            <div className='inner-div'>
              <Link to={"/"} className='icon-text-link'><IoMdHome className='icon-links' /></Link>
      <Theme/>
              <Link to={"/cart"} value={5} className='icon-text-link'><CgShoppingCart className='icon-links' /></Link>
              <Link className='icon-text-link'><CgHeart className='icon-links' /></Link>
              {isAuthenticated ? (
                <button className='log-Btn' onClick={handleLogOut}><IoIosLogOut className='icon-links' /></button>
              ) : (
                <Link className='icon-text-link' to={"/login"}><CgProfile className='icon-links' /></Link>
              )}
              <CgMoreVertical onClick={() => handleProfile()} className='icon-user' />
              {showCard && (
                <div ref={cardRef} className='profile_setting' onMouseLeave={handleMouseLeave}>
                  <h4>User Options</h4>
                  <Link className='profileLinks' to={"/MyAccount"} ><FaUser /> Profile</Link>
                </div>
              )}
            </div>
          </div>
        </Nav>
      </div>
    </>
  );
}

export default Home;
