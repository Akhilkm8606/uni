import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../style.css'; // Import the CSS file where you define your custom styles
import axios from 'axios';
function SellerList() {
    const [sellers, setSellers] =  useState([]);

  useEffect (() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sellers", {
          withCredentials: true
        });
        const sellersData = response.data.sellers;
        setSellers(response.data.sellers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className='usersList'>
        <Table striped bordered hover className='custom-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{seller.username}</td>
                <td>{seller.email}</td>
                <td>{seller.role}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default SellerList