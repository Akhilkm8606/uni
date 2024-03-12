import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Table } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
   

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products', {
          withCredentials: true,
        });
        setProducts(response.data.products);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns date in 'mm/dd/yyyy' format
  };

  return (
    <div>
       <Row>
            <h2>PRODUCTS</h2>
            <p>Total Product Count : {totalCount}</p>
            <div className='products'>
              <Table striped bordered hover className='custom-table'>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Date Of Added</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td><img style={{width:"30px"}} src={`http://localhost:5000/uploads/${product.images}`} alt={product.name} /></td>
                      <td>{formatDate(product.createdAt)}</td>
                      <td>
                        <MdEdit />
                      </td>
                      <td>
                        <MdDelete />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
    </div>
  )
}

export default ProductList