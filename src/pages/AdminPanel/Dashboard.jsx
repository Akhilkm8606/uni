import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row, Col } from 'react-bootstrap';
import '../../pages/AdminPanel/style.css';
import BarChart from '../SellerPanel/Barchart'; // Import your BarChart component
import { getAllOrder } from '../../components/Redux/Slice/orders'; // Import the action

function Dashboard() {
  const dispatch = useDispatch();

  const orders = useSelector(state => state.orders.orders) || [];  // Access orders from orders slice
  const products = useSelector(state => state.data.products) || []; // Ensure products is always an array
  const users = useSelector(state => state.auth.users) || []; // Use proper slice for all users

  // State for storing counts and chart data
  const [orderCount, setOrderCount] = useState(orders.length);  // Default count to existing length
  const [productCount, setProductCount] = useState(products.length);  // Same for products
  const [userCount, setUserCount] = useState(users.length);  // Same for users
  const [salesData, setSalesData] = useState({ labels: [], values: [] });

  // Use simulated data for the dashboard
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
  const salesLabels = simulatedSalesData.map(item => item.month);
  const salesValues = simulatedSalesData.map(item => item.value);

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
                    <span>{(item.value || 0).toLocaleString()}</span> {/* Use a fallback of 0 if value is undefined */}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Chart section */}
      <div>
        <BarChart title="Sales Data" data={{ labels: salesLabels, values: salesValues }} />
        <BarChart title="Order Data" data={{ labels: salesLabels, values: simulatedOrderData.map(item => item.count) }} />
        <BarChart title="Product Data" data={{ labels: salesLabels, values: simulatedProductData.map(item => item.count) }} />
      </div>
    </div>
  );
}

export default Dashboard;
