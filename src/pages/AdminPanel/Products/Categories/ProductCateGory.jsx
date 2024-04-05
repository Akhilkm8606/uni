import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../../../components/Redux/Slice/category';
import '../Categories/categories.css'; // Import your custom CSS file

function ProductCategory() {
  const categories = useSelector(state => state.cate.category);
  const dispatch = useDispatch();

  const [totalCateCount, setTotalCateCount] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCategories = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addcategories', {
        name: newCategoryName
      }, {
        withCredentials: true
      });
      dispatch(addCategory(response.data.categorys));
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  useEffect(() => {
    setTotalCateCount(categories.length);
  }, [categories]);

  return (
    <div className='categoryListing'>
      <Row>
        <h2>PRODUCTS CATEGORY</h2>
        <p>Total Product Category Count: {totalCateCount}</p>
   
    
        <div className='products custom-table-wrapper'>
          <Table striped bordered hover className='custom-table'>
            <tbody>
              {categories && categories.map(category => (
               <tr className='tabel-row' key={category._id}>
               <td>{category.name}</td>
               <td><MdDelete /></td>
             </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row>
        <form onSubmit={handleCategories} className='add-category-form'>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter new category name"
            className='category-input'
          />
          <button type='submit' className='add-category-btn'>Add</button>
        </form>
      </Row>
    </div>
  );
}

export default ProductCategory;
