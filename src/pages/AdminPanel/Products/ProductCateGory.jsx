import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Table } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md';



function ProductCateGory() {
    
const [category, setCategory] = useState([]);
const [totalCateCount, setTotalCateCount] = useState(0);
    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const categoryData = await axios.get('http://localhost:5000/categorys', {
              withCredentials: true,
            });
            setCategory(categoryData.data.categorys);
            setTotalCateCount(categoryData.data.categorys.length);
          } catch (error) {
            console.error('Error fetching category data:', error);
          }
        };
    
        
    
        fetchCategory();
    
      }, []);
    
  return (
    <div>
         <Row>
            <h2>PRODUCTS CATEGORY</h2>
            <p>Total Product Categpory Count : {totalCateCount}</p>
            <div className='products'>
              <Table striped bordered hover className='custom-table'>
                <tbody>
                  {category.map((cate, index) => (
                    <tr key={index}>
                      <td>{cate.name}</td>
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

export default ProductCateGory