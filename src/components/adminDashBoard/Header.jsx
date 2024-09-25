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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Example state for message and notification counts
  const [messageCount, setMessageCount] = useState(5); // Replace with actual count
  const [notificationCount, setNotificationCount] = useState(3); // Replace with actual count

  const [profileState, setProfileState] = useState({
    card: false,
    msg: false,
    nty: false,
  });

  const [dialogOpen, setDialogOpen] = useState({
    msg: false,
    nty: false,
  });

  const handleLogOut = async () => {
    try {
      await dispatch(userLogOut()); // Ensure this dispatch function returns a promise
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

  const openDialog = (type) => {
    setDialogOpen((prev) => ({ ...prev, [type]: true }));
  };

  const closeDialog = (type) => {
    setDialogOpen((prev) => ({ ...prev, [type]: false }));
  };

  // Navigation function


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

        <div className='header-icon-container'>
          <AiOutlineMail onClick={() => openDialog('msg')} className='icon-user' />
          {messageCount > 0 && <span className='badge'>{messageCount}</span>}
          <Dialog open={dialogOpen.msg} onClose={() => closeDialog('msg')}>
            <DialogTitle>Messages</DialogTitle>
            <DialogContent>
              <p>Message Section</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeDialog('msg')} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className='header-icon-container'>
          <IoMdNotifications onClick={() => openDialog('nty')} className='icon-user' />
          {notificationCount > 0 && <span className='badge'>{notificationCount}</span>}
          <Dialog open={dialogOpen.nty} onClose={() => closeDialog('nty')}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
              <p>Notification Section</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeDialog('nty')} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <FaCircleUser onClick={() => handleProfile('card')} className='icon-user' />
        {profileState.card && (
          <div className='profile_setting'>
            <h4>User Options</h4>
            <Link className='profileLinks'to={"/MyAccount"}><FaUser /> Profile</Link>
            <Link className='profileLinks' to="/settings"><IoSettingsOutline /> Settings</Link>
            <Link className='profileLinks' to="#" onClick={handleLogOut}><IoExit /> Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
