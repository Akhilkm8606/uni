import React from 'react';
import {  AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";

import { Button, Card, Row } from 'react-bootstrap';
import '../../components/adminDashBoard/style.css';

function Dashboard() {
  
  const items = [
    {
      icon: < AiOutlineShoppingCart 
      style={{color:"red"}} />,
      title: "Orders",
      value: 12345
    },
    {
      icon: <AiOutlineUser
      style={{color:"blue"}} />,
      title: "Usres",
      value: 12345
    },
    {
      icon: <AiOutlineShop 
      style={{color:"green"}} />,
      title: "Store",
      value: 12345
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
          <div className='card-container' key={index}>
            <Card className='card'>
              <Card.Body className='card-body'>
                <span className='icon'>{item.icon}</span>
                <div className='items'>
                <span>{item.title}</span>
                <span>{item.value.toLocaleString()}</span>                 </div>
                
              </Card.Body>
            </Card>
          </div>
        ))}
        </Row>

      </Row>
      <div>
      jkjkjkj
      </div>
    </div>
   
  );
}





export default Dashboard;