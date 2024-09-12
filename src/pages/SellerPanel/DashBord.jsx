import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart } from "react-icons/ai";
import { Card, Row } from 'react-bootstrap';
import instance from '../../Instance/axios';
import '../../pages/AdminPanel/style.css';
import { toast } from 'react-toastify';
import BarChart from './Barchart.jsx';

function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [orderData, setOrderData] = useState({ labels: [], values: [] });
  const [productData, setProductData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        console.log('Fetching dashboard data...');
        const response = await instance.get('/api/v1/viewDashboard', { withCredentials: true });

        if (response.status === 200) {
          const dashboardData = response.data.dashboard || {};
          console.log('Dashboard data:', dashboardData);

          // Use fallback values if properties are missing
          const orders = dashboardData.orders || [];
          const products = dashboardData.products || [];
          const monthlyData = dashboardData.monthlyData || [];

          setOrderCount(orders.length);
          setProductCount(products.length);

          // Handle the response data for charts
          const salesLabels = monthlyData.map(item => item.month || 'Unknown');
          const salesValues = monthlyData.map(item => item.sales || 0);
          const orderLabels = monthlyData.map(item => item.month || 'Unknown');
          const orderValues = monthlyData.map(item => item.orders || 0);
          const productLabels = monthlyData.map(item => item.month || 'Unknown');
          const productValues = monthlyData.map(item => item.products || 0);

          setSalesData({ labels: salesLabels, values: salesValues });
          setOrderData({ labels: orderLabels, values: orderValues });
          setProductData({ labels: productLabels, values: productValues });

        } else {
          console.error('Unexpected response status:', response.status);
          toast.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized: Please log in');
        } else {
          toast.error('Failed to fetch dashboard data');
        }
      }
    };

    fetchDashboard();
  }, []);

  const items = [
    {
      icon: <AiOutlineShoppingCart style={{ color: "red" }} />,
      title: "Orders",
      value: orderCount
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
