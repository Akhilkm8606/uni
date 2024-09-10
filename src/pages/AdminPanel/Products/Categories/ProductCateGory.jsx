import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../../../../components/Redux/Slice/category';
import '../Categories/categories.css'; // Import your custom CSS file
import instance from '../../../../Instance/axios';
import CloseBtn from '../../../../components/Buttons/CloseBtn';

function ProductCategory() {
  // Fallback to empty array to avoid undefined errors
  const categoryList = useSelector((state) => state.category.category || []); // Ensure default value is an empty array
  const dispatch = useDispatch();

  console.log(categories,'r');
  
  const [totalCateCount, setTotalCateCount] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCategories = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/api/v1/category', {
        name: newCategoryName
      }, {
        withCredentials: true
      });
      dispatch(addCategory(response.data.categorys));
      setNewCategoryName(""); // Reset the input field
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await instance.delete(`/api/v1/category/${categoryId}`, {
        withCredentials: true
      });
      dispatch(removeCategory(categoryId)); // Dispatch action to remove deleted category from Redux store
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    // Now it will work even if categories is undefined initially
    setTotalCateCount(categories.length);
  }, [categories]);

  return (
    <div className='categoryListing'>
      <CloseBtn />
      <Row>
        <h2>PRODUCTS CATEGORY</h2>
        <p>Total Product Category Count: {totalCateCount}</p>

        <div className='products custom-table-wrapper'>
          <Table striped bordered hover className='custom-table'>
            <tbody>
              {categories.map(category => (
                <tr className='tabel-row' key={category._id}>
                  <td className='c-td'>{category.name}</td>
                  <td className='c-td'>
                    <MdDelete onClick={() => handleDeleteCategory(category._id)} />
                  </td>
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
