import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setAllUsers, updateUsers } from '../../../components/Redux/Slice/user';
import { DataGrid } from '@mui/x-data-grid';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ToastContainer, toast } from 'react-toastify';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import './Users.css';
import instance from '../../../Instance/axios';
import { useNavigate } from 'react-router-dom';
import EditUser from './EditUser'; // Import the EditUser component

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user'); // Default role
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("/api/v1/users", { withCredentials: true });
        dispatch(setAllUsers(response.data.users));
      } catch (error) {
        toast.error('Error fetching data');
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleStatusChange = async (event, user) => {
    const newStatus = event.target.value;
    try {
      const updatedUser = { ...user, status: newStatus };
      const res = await instance.put(`/api/V1/Users/update/${updatedUser._id}`, updatedUser, { withCredentials: true });
      dispatch(updateUsers(res.data.user));
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleRoleChangeInGrid = async (event, user) => {
    const newRole = event.target.value;
    try {
      const updatedUser = { ...user, role: newRole };
      const res = await instance.put(`/api/V1/Users/update/${updatedUser._id}`, updatedUser, { withCredentials: true });
      dispatch(updateUsers(res.data.user));
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await instance.delete(`/api/v1/user/${deleteUserId}`, { withCredentials: true });
      setOpenDeleteDialog(false);
      dispatch(deleteUser(deleteUserId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setOpenDeleteDialog(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'User', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <select
          className='sts'
          value={params.row.status}
          onChange={(e) => handleStatusChange(e, params.row)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      )
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <select
          className='rle'
          value={params.row.role}
          onChange={(e) => handleRoleChangeInGrid(e, params.row)}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      )
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <EditNoteOutlinedIcon
          onClick={() => handleEdit(params.row)}
          style={{ cursor: 'pointer', margin: 20, fontSize: 24 }}
        />
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteClick(params.row._id)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      )
    }
  ], [users]);

  const filteredUsers = useMemo(() => users
    .filter(user => user.role === selectedRole)
    .map((user, index) => ({ ...user, id: index + 1 })), [users, selectedRole]);

  return (
    <div className='users_container'>
      <div className='usersList'>
        <div className='input-div'>
          <h2>Customers</h2>
          <select className='select' value={selectedRole} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='box'>
          <DataGrid 
            rows={filteredUsers}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
          />
        </div>
      </div>
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        
        <DialogContent>
          {selectedUser && <EditUser user={selectedUser} onClose={() => setOpenEditDialog(false)} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default UserList;
