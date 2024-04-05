// UserList.js
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../../components/Redux/Slice/user'; // Adjust the path accordingly

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.auth.users);
    const [user, setUsers] =  useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users", {
                    withCredentials: true
                });
                dispatch(setAllUsers(response.data.users)); // Dispatch action to update users array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

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
            {user.map((user, index) => (
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
