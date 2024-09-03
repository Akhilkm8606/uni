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
    // Simulated data with more data points
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

    const salesLabels = simulatedSalesData.map(item => item.month);
    const salesValues = simulatedSalesData.map(item => item.value);

    const orderLabels = simulatedOrderData.map(item => item.month);
    const orderValues = simulatedOrderData.map(item => item.count);

    const productLabels = simulatedProductData.map(item => item.month);
    const productValues = simulatedProductData.map(item => item.count);

    setSalesData({ labels: salesLabels, values: salesValues });
    setOrderData({ labels: orderLabels, values: orderValues });
    setProductData({ labels: productLabels, values: productValues });

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
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to fetch dashboard data');
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
