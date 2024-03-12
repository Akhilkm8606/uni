import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import "./Home.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosMail, IoMdCall, IoIosSearch, IoIosLogOut } from "react-icons/io";
import { CgHeart, CgMoreVertical, CgProfile, CgShoppingCart } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from "../../Redux/Slice/user"; // Corrected import
import NavBar from './NavBar';

function Home() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogOut = () => {
    try {
      dispatch(userLogOut());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <> 
      <div id='header'>
        <Nav className='nav-Top'>
          {!isAuthenticated && <Link to={"/signUp"} className="top">Sign Up</Link>}
          <Link to="mailto:unifiedcart@gmail.com" className="top">
            <IoIosMail className='icon-links' /><span>unifiedcart@gmail.com</span>
          </Link>
          <Link to="tel:0466-256644" className="top">
            <IoMdCall className='icon-links' /><span>0466-256644</span>
          </Link>
        </Nav>
        <Nav className='main-header'>
          <div className='search-bar'>
            <input type="search" placeholder='Search' />
            <IoIosSearch className="search-icon" />
          </div>
          <div className='logo'>
            UNIFIED CART
          </div>
          <div className='cart'>
            <div className='inner-div'>
              {isAuthenticated ? (
                <Link className='log-Btn' onClick={handleLogOut}><IoIosLogOut className='icon-links' /></Link> // Button instead of Link
              ) : (
                <Link className='icon-text-link' to={"/login"}><CgProfile className='icon-links' /></Link>
              )}
              <Link className='icon-text-link'><CgShoppingCart className='icon-links' /></Link>
              <Link className='icon-text-link'><CgHeart className='icon-links' /></Link>
              <Link className='icon-text-link'><CgMoreVertical className='icon-links' /></Link>
            </div>
          </div>
        </Nav>
        <NavBar />
      </div>
    </>
  );
}

export default Home;
