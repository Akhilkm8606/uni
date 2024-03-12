import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../style.css'; // Import the CSS file where you define your custom styles
import axios from 'axios';

function UserList() {
  const [users, setUsers] =  useState([]);

  useEffect (() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          withCredentials: true
        });
        const usersData = response.data.users;
        setUsers(usersData);
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
