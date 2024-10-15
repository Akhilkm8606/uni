import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, removeOrder } from '../../../components/Redux/Slice/orders';
import { useNavigate } from 'react-router-dom';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import instance from '../../../Instance/axios';
import OrderDetails from './OrderDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const ordersList = useSelector(state => state.orders.orders);
  const token = localStorage.getItem('token'); // or wherever you store your token


  const fetchOrders = async () => {
    try {
      const response = await instance.get('/api/v1/all_orders', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}` // Ensure you include the token if required
        }
      });
      
      console.log(response.data.orders);
      
      if (response) {
        dispatch(getAllOrder(response.data.orders));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await instance.delete(`/api/v1/orders/${deleteOrderId}`, { withCredentials: true });
      dispatch(removeOrder(deleteOrderId)); // Update local state
      setOpenDeleteDialog(false);
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    } finally {
      setLoading(false);
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
      width: 300,
      renderCell: (params) => (
        <div>
          {params.row.items.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      ),
    },
    { field: 'id', headerName: 'Order Id', width: 150 },
    {
      field: 'Price',
      headerName: 'Price',
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.items.map((item, index) => (
            <div key={index}>{item.price}</div>
          ))}
        </div>
      ),
    },
    {
      field: 'Quantity',
      headerName: 'Quantity',
      width: 100,
      renderCell: (params) => (
        <div>
          {params.row.items.map((item, index) => (
            <div key={index}>{item.quantity}</div>
          ))}
        </div>
      ),
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 150,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let cellStyle = {};

        switch (status) {
          case 'Pending':
            cellStyle = { color: 'black' };
            break;
          case 'Cancel':
            cellStyle = { color: 'red' };
            break;
          case 'Processing':
            cellStyle = { color: 'blue' };
            break;
          case 'Shipped':
            cellStyle = { color: 'orange' };
            break;
          case 'Delivered':
            cellStyle = { color: 'green' };
            break;
          default:
            break;
        }

        return (
          <div style={cellStyle}>
            {status}
          </div>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditNoteOutlinedIcon style={{ fontSize: 24 }} />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteClick(params.row.id)}>
          <DeleteOutlineOutlinedIcon style={{ fontSize: 24 }} />
        </IconButton>
      ),
    },
  ];

  const ordersWithIds = ordersList.map((order) => ({ ...order, id: order._id }));

  return (
    <div className='order-container'>
      <h2>Order List</h2>
      <div className='od-box' style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={ordersWithIds}
          columns={columns}
          pageSize={5}
        />
      </div>

      {/* Order Details Overlay */}
      {showOrderDetails && (
        <Dialog open={showOrderDetails} onClose={() => setShowOrderDetails(false)} fullWidth maxWidth="md">
          <DialogContent>
            <OrderDetails order={selectedOrder} onClose={() => setShowOrderDetails(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order?
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

      <ToastContainer />
    </div>
  );
}

export default Orders;
