// components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart } from "react-icons/ai";
import { Card, Row } from 'react-bootstrap';
import instance from '../../Instance/axios'; // Your Axios instance
import '../../pages/AdminPanel/style.css';
import { toast } from 'react-toastify';
import BarChart from './Barchart.jsx';
import { useSelector } from 'react-redux'; // Make sure to include redux

function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [orderData, setOrderData] = useState({ labels: [], values: [] });
  const [productData, setProductData] = useState({ labels: [], values: [] });

  const users = useSelector(state => state.auth.user); // Get user from Redux state
  const sellerId = users?._id;

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      console.log(token, 'token');
    
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
      
      try {
        // Make the request with the Authorization header if token is available
        const response = await instance.get(`/api/v1/viewDashboard/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
          withCredentials: true,
        });
        

        console.log(response);
        
        if (response.status === 200) {
          const dashboardData = response.data.dashboard || {};
          console.log('Dashboard data:', dashboardData);

          const orders = dashboardData.orders || [];
          const products = dashboardData.products || [];
          const sales = dashboardData.sales || [];
          const monthlyData = dashboardData.monthlyData || [];

          setOrderCount(orders.length);
          setProductCount(products.length);

          // Handle the response data
          const chartLabels = monthlyData.map(item => item.month || 'Unknown');
          const chartValues = monthlyData.map(item => item.value || 0);

          setSalesData({ labels: chartLabels, values: chartValues });
        } else {
          console.error('Unexpected response status:', response.status);
          toast.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
          toast.error('You need to log in to access the dashboard.');
          // You can redirect to login here if needed
        } else {
          console.error('Error fetching dashboard data:', error);
          toast.error('Failed to fetch dashboard data');
        }
      }
    };

    // Check if sellerId exists before fetching the dashboard data
    if (sellerId) {
      fetchDashboard();
    } else {
      console.warn('User is not authenticated or token is missing.');
    }
  }, [sellerId]); // Depend on sellerId to trigger the effect

  const items = [
    {
      icon: <AiOutlineShoppingCart style={{ color: "red" }} />,
      title: "Orders",
      value: orderCount
    },
    {
      icon: <AiOutlineShop style={{ color: "green" }} />,
      title: "Store",
      value: productCount
    },
  ];

  return (
    <div className='container'>
      <Row>
        <h2>SELLER DASHBOARD</h2>
      </Row>
      <Row>
        <Row className='card-Row'>
          {items.map((item, index) => (
            <div className='card-container' key={index}>
              <Card className='card'>
                <Card.Body className='card-body'>
                  <span className='icon'>{item.icon}</span>
                  <div className='items'>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Row>
      <div>
        <BarChart title="Sales Data" data={salesData} />
        <BarChart title="Order Data" data={orderData} />
        <BarChart title="Product Data" data={productData} />
      </div>
    </div>
  );
}

export default Dashboard;
