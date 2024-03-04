import React from 'react';
import {  AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";

import { Button, Card, Row } from 'react-bootstrap';
import '../../components/adminDashBoard/style.css';

function Dashboard() {
  
  const items = [
    {
      icon: < AiOutlineShoppingCart />,
      title: "Orders",
      value: 123
    },
    {
      icon: <AiOutlineUser />,
      title: "Usres",
      value: 123
    },
    {
      icon: <AiOutlineShop />,
      title: "Store",
      value: 123
    },
  ];

  return (
    <div className='container'>
      <Row>
        <h2>DASHBOARD</h2>
      </Row>
      <Row>
        <Row className='card-Row' >
        {items.map((item, index) => (
          <div className='card-container' key={index}>
            <Card className='card'>
              <Card.Body className='card-body'>
                <span className='icon'>{item.icon}</span>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </Card.Body>
            </Card>
          </div>
        ))}
        </Row>

      </Row>
    </div>
  );
}

export default Dashboard;
