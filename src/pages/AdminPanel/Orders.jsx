import React from 'react'
import { Row, Table } from 'react-bootstrap'

function Orders() {
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