import React, { useEffect, useState } from 'react';
import {  AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";

import { Button, Card, Row } from 'react-bootstrap';
import '../../components/adminDashBoard/style.css';
import { useSelector } from 'react-redux';


function Dashboard() {
  const orders = useSelector(state => state.orders);
  const product = useSelector(state => state.data.products);
  const users = useSelector(state => state.auth.users);
  const user = users.filter(user =>  user.role === 'user');
  const seller = users.filter(user =>  user.role === 'seller');
  
 
  const allUsers = [...user, ...seller];

  const [orderCount, setOrderCount] = useState(0);

useEffect(() =>{
  if (orders) {
    let totalCount = 0;
     Object.values(orders).forEach(items => {
      totalCount += items.length;
    });
    setOrderCount(totalCount);
  }
},[orders,product])
  const items = [
    {
      icon: < AiOutlineShoppingCart 
      style={{color:"red"}} />,
      title: "Orders",
      value: orderCount
    },
    {
      icon: <AiOutlineUser
      style={{color:"blue"}} />,
      title: "Usres",
      value: allUsers.length
    },
    {
      icon: <AiOutlineShop 
      style={{color:"green"}} />,
      title: "Store",
      value: product.length
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