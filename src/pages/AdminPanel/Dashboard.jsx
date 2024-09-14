// components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row, Col, Container } from 'react-bootstrap';
import instance from '../../Instance/axios'; // Your Axios instance
import '../../pages/AdminPanel/style.css';
import { toast } from 'react-toastify';
import BarChart from '../SellerPanel/Barchart'; // Import your BarChart component
import { useSelector } from 'react-redux'; // Include redux

function AdminDashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // Total user count
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [orderData, setOrderData] = useState({ labels: [], values: [] });
  const [productData, setProductData] = useState({ labels: [], values: [] });

  const users = useSelector(state => state.auth.user); // Get current user from Redux
  const isAdminId = users?._id ; // Ensure the current user is admin

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
    
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
      
      try {
        // Make the request with the Authorization header if token is available
        const response = await instance.get(`/api/v1/viewDashboard/${isAdminId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const dashboardData = response.data.dashboard || {};
          const orders = dashboardData.orders || [];
          const products = dashboardData.products || [];
          const users = dashboardData.users || [];
          const monthlyData = dashboardData.monthlyData || [];

          setOrderCount(orders.length);
          setProductCount(products.length);
          setUserCount(users.length); // Set total user count (buyers and sellers)

          // Prepare chart data
          const chartLabels = monthlyData.map(item => item.month || 'Unknown');
          const chartValues = monthlyData.map(item => item.value || 0);

          setSalesData({ labels: chartLabels, values: chartValues });
        } else {
          toast.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('You need to log in to access the dashboard.');
        } else {
          toast.error('Failed to fetch dashboard data');
        }
      }
    };

    // Ensure admin role before fetching the data
    if (isAdmin) {
      fetchDashboard();
    } else {
      toast.error('You are not authorized to view this page.');
    }
  }, [isAdmin]);

  // Items to display in cards
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
    <div className='admin-dashboard'>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2 className="dashboard-title text-center">ADMIN DASHBOARD</h2>
          </Col>
        </Row>

        {/* Cards Section */}
        <Row className="card-Row mb-4">
          {items.map((item, index) => (
            <Col key={index} md={4}>
              <div className='card-container'>
                <Card className='dashboard-card'>
                  <Card.Body className='card-body'>
                    <span className='icon'>{item.icon}</span>
                    <div className='items'>
                      <span className="item-title">{item.title}</span>
                      <span className="item-value">{item.value.toLocaleString()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Charts Section */}
        <Row className="charts-section">
          <Col md={6} className="mb-4">
            <Card className="chart-card">
              <Card.Body>
                <BarChart title="Sales Data" data={salesData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="chart-card">
              <Card.Body>
                <BarChart title="Order Data" data={orderData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} className="mb-4">
            <Card className="chart-card">
              <Card.Body>
                <BarChart title="Product Data" data={productData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
