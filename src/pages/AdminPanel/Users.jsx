import React from 'react';
import { Row, Table } from 'react-bootstrap';
import '../../components/SellerDashBoard/Style.css'; // Import the CSS file where you define your custom styles

function Users() {


  
  return (
    <div>
      <Row>
        <h2>USERS</h2>
      </Row>
      
      <Row>
        <Table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Users;
