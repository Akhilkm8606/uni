import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getAllOrder } from '../../components/Redux/Slice/orders'


function Orders() {
  const dispatch = useDispatch()
  const [orders,getOrders] =useState([])
  useEffect(() =>{
    const fetchOrders = async () =>{
    try {
    
        const response = await axios.get('http://localhost:5000/all_orders',{withCredentials:true})
        getOrders(response.data.orders)
     console.log(response.data.orders)

      dispatch(getAllOrder(response.data.orders))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  fetchOrders()

  },[dispatch])
  return (
    <div>
      <Row>
        <h2>ORDERS</h2>
      </Row>
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
          {/* <tbody>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
          </tbody> */}
        </Table>
      </div>
    </div>
  )
}

export default Orders