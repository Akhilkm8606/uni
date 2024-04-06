import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setAllUsers } from '../../../components/Redux/Slice/user';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';

function SellerList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          withCredentials: true
        });
        dispatch(setAllUsers(response.data.users));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleEdit = async (userId) => {
    try {
      // Handle edit functionality here
      console.log("Edit user with ID:", userId);
      


      
    } catch (error) {
      console.error('Error editing user:', error.message);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true); // Set loading to true
      const userIdToRemove = deleteUserId;
      console.log(userIdToRemove); // Ensure userIdToRemove is correctly assigned
      await axios.delete(`http://localhost:5000/users/${userIdToRemove}`, { withCredentials: true });
      setOpenDeleteDialog(false);
      dispatch(deleteUser(userIdToRemove)); // Dispatch action to delete user from store
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'User', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const user = params.row;
        return (
          <Switch
            checked={user.status === 'active'}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        );
      }
    }, { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <EditIcon
          onClick={() => handleEdit(params.row.id)}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => {
        const userId = params.row._id;
        return (
          <IconButton onClick={() => handleDeleteClick(userId)}>
            <GridDeleteIcon />
          </IconButton>
        );
      }
    }
  ];

  // Add unique IDs to the users array
  const usersWithIds = users.map((user, index) => ({ ...user, id: user._id }));
  const filteredUsers = usersWithIds.filter(user => user.role === 'seller');

  return (
    <div className='users_container'>
      <div className='usersList'>
        <h2>Sellers</h2>
        <div className='inpu-div'>
          <input type="text" placeholder='search here' />
          <button className='s-btn'>search</button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SellerList;
