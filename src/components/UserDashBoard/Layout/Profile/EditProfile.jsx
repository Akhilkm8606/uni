import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../Redux/Slice/user';
import instance from '../../../../Instance/axios';

function EditProfile({ open, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userID = user?._id;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/api/v1/updateUser/${userID}`, formData, {
        withCredentials: true,
      });
      dispatch(updateUser(response.data.user));
      handleClose(); // Close the dialog on successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      // Log detailed error information
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfile;
