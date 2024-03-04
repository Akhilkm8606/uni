import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import './style.css'; // Import the CSS file where you define your custom styles
import axios from 'axios';

function Users() {
  const [users, setUsers] =  useState([])
  useEffect (() =>{
    const fectchData = async() =>{
      const response = await axios.get("http://localhost:5000/users",{
        withCredentials:true
      })
    setUsers(response.data.users)
   
    const userData =   response.data.users
    console.log(userData);
    userData.forEach((user) =>{
      console.log(user.username); // Log each user's details

    })
    }
    fectchData()
  },[])
  


  
  return (
    <div>
    
    <div className='usersList'>
    user
    <Table striped bordered hover  className='table'>
    <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
   
    
        <tbody>
        {users.map((user,index) =>{
        <tr>
          <td key={index}>1</td>
          <td>{user.username}</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        
      })}
      </tbody>
   
      
    </Table>
    </div>
    </div>
  );
}

export default Users;
