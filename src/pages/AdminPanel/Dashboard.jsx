import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row, Col } from 'react-bootstrap';
import '../../pages/AdminPanel/style.css';
import { useSelector } from 'react-redux';
import BarChart from '../SellerPanel/Barchart'; // Import BarChart component
import instance from '../../Instance/axios'; // Import axios instance
import { toast } from 'react-toastify';

function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // Total user count
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [orderData, setOrderData] = useState({ labels: [], values: [] });
  const [productData, setProductData] = useState({ labels: [], values: [] });

  const users = useSelector(state => state.auth.user); // Get current user from Redux
  const isAdminId = users?._id; // Ensure the current user is admin

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
    
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
      
      try {
        // Make the request with the Authorization header if token is available
        const response = await instance.get(`/api/v1/viewAdminDashboard/${isAdminId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
          withCredentials: true,
        });
        console.log(response,'ppp');
        

        if (response.status === 200) {
          const dashboardData = response.data.dashboard || {};
          const orders = dashboardData.orders || [];
          const products = dashboardData.products || [];
          const users = dashboardData.users || [];
          const monthlyData = dashboardData.monthlyData || [];

          setOrderCount(orders.length);
          setProductCount(products.length);
          setUserCount(users.length);

          const chartLabels = monthlyData.map(item => item.month);
          const chartValues = monthlyData.map(item => item.value);

          setSalesData({ labels: chartLabels, values: chartValues });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to fetch dashboard data');
      }
    };

    if (isAdminId) {
      fetchDashboard();
    }
  }, [isAdminId]);

  // Simulated data for fallback if API fails
  const simulatedSalesData = [
    { month: 'January', value: 5000 },
    { month: 'February', value: 6000 },
    { month: 'March', value: 7000 },
    // Add other months...
  ];

  const simulatedOrderData = [
    { month: 'January', count: 150 },
    { month: 'February', count: 170 },
    // Add other months...
  ];

  const simulatedProductData = [
    { month: 'January', count: 100 },
    { month: 'February', count: 120 },
    // Add other months...
  ];

  // Use simulated data if no API data is available
  const salesLabels = salesData.labels.length ? salesData.labels : simulatedSalesData.map(item => item.month);
  const salesValues = salesData.values.length ? salesData.values : simulatedSalesData.map(item => item.value);

  const orderLabels = orderData.labels.length ? orderData.labels : simulatedOrderData.map(item => item.month);
  const orderValues = orderData.values.length ? orderData.values : simulatedOrderData.map(item => item.count);

  const productLabels = productData.labels.length ? productData.labels : simulatedProductData.map(item => item.month);
  const productValues = productData.values.length ? productData.values : simulatedProductData.map(item => item.count);

  const items = [
    {
      icon: <AiOutlineShoppingCart style={{ color: "red" }} />,
      title: "Orders",
      value: orderCount
    },
    {
      icon: <AiOutlineUser style={{ color: "blue" }} />,
      title: "Users",
      value: userCount
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
        <h2>DASHBOARD</h2>
      </Row>
      <Row>
        <Row className='card-Row'>
          {items.map((item, index) => (
            <Col key={index} md={4}>
              <div className='card-container'>
                <Card className='card'>
                  <Card.Body className='card-body'>
                    <span className='icon'>{item.icon}</span>
                    <div className='items'>
                      <span>{item.title}</span>
                      <span>{item.value.toLocaleString()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Row>
      <div>
        <BarChart title="Sales Data" data={{ labels: salesLabels, values: salesValues }} />
        <BarChart title="Order Data" data={{ labels: orderLabels, values: orderValues }} />
        <BarChart title="Product Data" data={{ labels: productLabels, values: productValues }} />
      </div>
    </div>
  );
}

export default Dashboard;
