


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, removeOrder,  } from '../../../components/Redux/Slice/orders'
import {  useNavigate } from 'react-router-dom';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// import { deleteUser, setAllUsers } from '../../../components/Redux/Slice/user';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import instance from '../../../Instance/axios';




function Orders() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const ordersList = useSelector(state => state.orders.orders);
  console.log(ordersList,'oo');
  const [loading, setLoading] = useState(false); // Loading state

    const [orders,getOrders] =useState([])
    useEffect(() =>{
      const fetchOrders = async () =>{
      try {
      
          const response = await instance.get('/api/v1/all_orders',{withCredentials:true})
          getOrders(response.data.orders)
       console.log(response.data.orders,'l')
  
        dispatch(getAllOrder(response.data.orders))
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchOrders()
  
    },[dispatch])
    const handleEdit =  (orderId, ) => {
  
        navigate(`/admin/order/${orderId}`);
     
   
    };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true); // Set loading to true
      const orderIdToRemove = deleteOrderId;
      console.log(orderIdToRemove);
     // Ensure userIdToRemove is correctly assigned
     
      const resospone = await instance.delete(`/api/v1/orders/${orderIdToRemove}`, { withCredentials: true });
      setOpenDeleteDialog(false);
      dispatch(removeOrder(orderIdToRemove)); // Dispatch action to delete user from store
      console.log('order deleted successfully');
      console.log(resospone,'order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleDeleteCancel = () => {
    setDeleteOrderId(null);
    setOpenDeleteDialog(false);
  };


  const columns = [
  
   
 {
      field: 'Product',
      headerName: 'Product',
      width: 300, // Adjust the width as needed
      renderCell: (params) => (
        <div onClick={() => handleOrderDetails(params.row.id)}>
          {params.row.items.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      )
    },
    { field: 'id', headerName: 'Order Id', width: 150 },

   
    {
      field: 'Price',
      headerName: 'Price',
      width: 150, // Adjust the width as needed
      renderCell: (params) => (
        <div>
          {params.row.items.map((item, index) => (
            <div key={index}>{item.price} </div>
          ))}
        </div>
      )
    },

    {
      field : "Quantity",
      headerName :"Quantity",
      width  : 100,
      renderCell : (params) =>(
        <div>
          {params.row.items.map((items,index)=>(
            
          <div  key={index}> {items.quantity}</div>
          ))}
        </div>
      )
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
    },
    
    {
      field: "status",
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let cellStyle = {};
        
        // Apply styles based on status
        switch (status) {
          case 'Pending':
            cellStyle = { color: 'black' };
            break;
          case 'Cancel':
            cellStyle = { color: 'red' };
            break;
          case 'Processing':
            cellStyle = { color: 'blue' }; // Example color for Processing
            break;
          case 'Shipped':
            cellStyle = { color: 'orange' }; // Example color for Shipped
            break;
          case 'Delivered':
            cellStyle = { color: 'green' }; // Example color for Delivered
            break;
          default:
            // Default style
            break;
        }
        
        return (
          <div style={cellStyle}>
            {status}
          </div>
        );
      }
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <EditNoteOutlinedIcon
          onClick={() => handleEdit(params.row.id)}
          style={{ cursor: 'pointer ',margin:20, fontSize:24,  }}
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
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        );
      }
    }
   
  ];


  const ordersWithIds = ordersList.map((order, index) => ({ ...order, id: order._id }));

  return (
    <div className='order-container'>
      <div className='orderList'>
        <h2>Order List</h2>
       
        <div className='od-box' style={{ height: 400, width: '100%',}} >
          <DataGrid
            rows={ordersWithIds}
            columns={columns}
            pageSize={5}
        
           
            onEditCellChange={(params) => {
              const newData = { ...params.row, [params.field]: params.props.value };
              handleEdit(params.id, newData);
            }}
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

export default Orders;
