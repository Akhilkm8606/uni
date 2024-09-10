import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row, Col } from 'react-bootstrap';
import '../../pages/AdminPanel/style.css';
import { useSelector } from 'react-redux';
import BarChart from '../SellerPanel/Barchart'; // Import your BarChart component
import instance from '../../Instance/axios'; // Import your axios instance
import { toast } from 'react-toastify';

function Dashboard() {
  const orders = useSelector(state => state.orders);
  const products = useSelector(state => state.data.products);
  const users = useSelector(state => state.auth.users);

  // Filter users
  const user = users.filter(user => user.role === 'user');
  const seller = users.filter(user => user.role === 'seller');
  const allUsers = [...user, ...seller];

  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [orderData, setOrderData] = useState({ labels: [], values: [] });
  const [productData, setProductData] = useState({ labels: [], values: [] });

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await instance.get('/api/v1/viewDashboard', {
        withCredentials: true
      });

      const dashboardData = res.data.dashboard;
      console.log(dashboardData);

      const orders = dashboardData.orders;
      const products = dashboardData.products;
      const monthlyData = dashboardData.monthlyData; // Adjust based on your API response

      setOrderCount(orders.length);
      setProductCount(products.length);

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

  // Simulated data (for fallback if API data is not reliable)
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

  // Use simulated data if no API data is available
  const salesLabels = (salesData.labels.length ? salesData.labels : simulatedSalesData.map(item => item.month));
  const salesValues = (salesData.values.length ? salesData.values : simulatedSalesData.map(item => item.value));

  const orderLabels = (orderData.labels.length ? orderData.labels : simulatedOrderData.map(item => item.month));
  const orderValues = (orderData.values.length ? orderData.values : simulatedOrderData.map(item => item.count));

  const productLabels = (productData.labels.length ? productData.labels : simulatedProductData.map(item => item.month));
  const productValues = (productData.values.length ? productData.values : simulatedProductData.map(item => item.count));

  const items = [
    {
      icon: <AiOutlineShoppingCart style={{ color: "red" }} />,
      title: "Orders",
      value: orderCount
    },
    {
      icon: <AiOutlineUser style={{ color: "blue" }} />,
      title: "Users",
      value: allUsers.length
    },
    {
      icon: <AiOutlineShop style={{ color: "green" }} />,
      title: "Store",
      value: products.length
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
