import React, { useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import instance from '../../Instance/axios';
import '../../pages/AdminPanel/style.css';
import { toast } from 'react-toastify';

function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await instance.get(`/api/v1/viewDashboard`, { withCredentials: true });
        const dashboardData = res.data.dashboard;
        console.log(dashboardData);

        const orders = dashboardData.orders;
        const products = dashboardData.products;
        // const users = data.users;

        setOrderCount(orders.length);
        setProductCount(products.length)        // setUserCount(users.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to fetch dashboard data');
      }
    };
    fetchDashboard();
  }, []);

  console.log(orderCount);
  console.log(productCount);
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
        Additional Content
      </div>
    </div>
  );
}

export default Dashboard;
