import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row, Col } from 'react-bootstrap';
import '../../pages/AdminPanel/style.css';
import { useSelector } from 'react-redux';
import BarChart from '../SellerPanel/Barchart'; // Import your BarChart component
import instance from '../../Instance/axios'; // Import your axios instance
import { toast } from 'react-toastify';

function Dashboard() {
  const orders = useSelector(state => state.orders) || [];  // Ensure orders is always an array
  const products = useSelector(state => state.data.products) || []; // Ensure products is always an array
  const allUsers = useSelector((state) => state.userAuth.users || []);

  const admin = useSelector(state => state.auth.user)?._id;  // Get the admin's _id
  
  // State for storing counts and chart data
  const [orderCount, setOrderCount] = useState(orders.length);  // Default count to existing length
  const [productCount, setProductCount] = useState(products.length);  // Same for products
  const [userCount, setUserCount] = useState(allUsers.length);  // Same for users
  const [salesData, setSalesData] = useState({ labels: [], values: [] });

  // Fetch dashboard data
  const fetchDashboard = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('No authentication token found');
      return;
    }

    try {
      const response = await instance.get(`/api/v1/viewAdminDashboard/${admin}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const dashboardData = response.data.dashboard;
      
      const fetchedOrders = dashboardData.orders;
      const fetchedProducts = dashboardData.products;
      const monthlyData = dashboardData.monthlyData;

      // Set the counts from the fetched data
      setOrderCount(fetchedOrders.length);
      setProductCount(fetchedProducts.length);
      setUserCount(allUsers.length); // Ensure users count is updated if changed
      
      // Set chart data
      const chartLabels = monthlyData.map(item => item.month);
      const chartValues = monthlyData.map(item => item.value);
      setSalesData({ labels: chartLabels, values: chartValues });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to fetch dashboard data');
    }
  };

  // Call fetchDashboard when component mounts
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Simulated fallback data
  const simulatedSalesData = [
    { month: 'January', value: 5000 },
    { month: 'February', value: 6000 },
    { month: 'March', value: 7000 },
    { month: 'April', value: 8000 },
    { month: 'May', value: 7500 },
    { month: 'June', value: 8500 },
    { month: 'July', value: 9000 },
    { month: 'August', value: 9500 },
    { month: 'September', value: 10000 },
    { month: 'October', value: 11000 },
    { month: 'November', value: 12000 },
    { month: 'December', value: 13000 }
  ];

  const simulatedOrderData = [
    { month: 'January', count: 150 },
    { month: 'February', count: 170 },
    { month: 'March', count: 200 },
    { month: 'April', count: 180 },
    { month: 'May', count: 190 },
    { month: 'June', count: 210 },
    { month: 'July', count: 230 },
    { month: 'August', count: 250 },
    { month: 'September', count: 270 },
    { month: 'October', count: 290 },
    { month: 'November', count: 310 },
    { month: 'December', count: 330 }
  ];

  const simulatedProductData = [
    { month: 'January', count: 100 },
    { month: 'February', count: 120 },
    { month: 'March', count: 150 },
    { month: 'April', count: 130 },
    { month: 'May', count: 140 },
    { month: 'June', count: 160 },
    { month: 'July', count: 180 },
    { month: 'August', count: 200 },
    { month: 'September', count: 220 },
    { month: 'October', count: 240 },
    { month: 'November', count: 260 },
    { month: 'December', count: 280 }
  ];

  // Use fallback simulated data if no API data is available
  const salesLabels = (salesData.labels.length ? salesData.labels : simulatedSalesData.map(item => item.month));
  const salesValues = (salesData.values.length ? salesData.values : simulatedSalesData.map(item => item.value));
console.log(orderCount,"kjjhj");
console.log(userCount,"kjjhj");
console.log(productCount,"kjjhj");

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
      title: "Products",
      value: productCount
    },
  ];

  return (
    <div className='container'>
      <Row>
        <h2>DASHBOARD</h2>
      </Row>
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
      <div>
        <BarChart title="Sales Data" data={{ labels: salesLabels, values: salesValues }} />
        {/* Other charts here */}
      </div>
    </div>
  );
}

export default Dashboard;
