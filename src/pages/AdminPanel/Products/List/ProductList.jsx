import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete, MdEdit, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { getProducts } from '../../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../../../Instance/axios';

function ProductList({ onAddProductClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0); // State to manage current page
  const productsPerPage = 8; // Number of products per page
  const data = useSelector(state => state.data);
  const user = useSelector(state => state.auth.user);

  const products = useSelector(state => state.data.products);
  const pageCount = Math.ceil(products.length / productsPerPage); // Calculate total number of pages

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns date in 'mm/dd/yyyy' format
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected); // Update current page number when page is clicked
  };

  const handleEdit = (id) =>{
    navigate(`/admin/products/edit/${id}`);
  }
  const handelDelet = async (productId) =>{
   try {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Send DELETE request to the server
      await instance.delete(`/api/v1/product/${productId}`, { withCredentials: true });
      
      // Dispatch action to update the store after successful deletion
      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
      
      // Show success message
      toast.success('Product deleted successfully');
    }
  }catch (error) {
    console.error('Error deleting product:', error);
    // Show error message
    toast.error('Failed to delete product');
    
   }

  }

  const startIndex = pageNumber * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className='pd-container'>
        <h2 className='pd-heading'>PRODUCTS</h2>
        {/* <div className='seracch-p'>
                <div className='inpu-div'>
                <input type="text" placeholder='search here' />
                <button className='s-btn'>serch</button>
              
                </div>
                <div className='link-div'>
                  <Link className='add-link'>
                  Add New</Link>
                </div>
               
              </div> */}
        <Row className='pd-row'>
          <div className='p-outer-div'>
            <div className='products-div'>
            <ReactPaginate
                previousLabel={<MdSkipPrevious/>}
                nextLabel={<MdSkipNext/>}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />


             
              <Table striped bordered hover className='custom-p-table'>
                <thead>
                  <tr>
                    <th className='product-name'>Product Name</th>
                    <th className='product-name'>category</th>
                    <th className='product-price'>Price</th>
                    <th className='product-stock'>Stock</th>
                    <th className='product-image'>Image</th>
                    <th className='product-date'>Date Of Added</th>
                    <th className='product-actions'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product, index) => (
                    <tr className='pdata-row' key={index}>
                      <td className='product-name'>{product.name}</td>
                      <td className='product-category'>{product.category}</td>
                      <td className='product-price'>{product.price}</td>
                      <td className='product-stock'>{product.quantity}</td>
                      <div>
                      <td className='product-image'>
                        <img className='p-imag' src={`http://localhost:5000/uploads/${product.images}`} alt={product.name} />
                        </td>

                      </div>                      <td className='product-date'>{formatDate(product.createdAt)}</td>
                      <td className='product-actions'>
                       <span>
                       <MdEdit onClick={() => handleEdit(product._id)} className='action-edit' />
                       </span>
                       <span>
                       <MdDelete onClick={() =>handelDelet(product._id)} className='action-delete' />
                       </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            
            </div>
           
          </div>
        </Row>
      </div>
    </>
  );
}

export default ProductList;
