import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete, MdEdit, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { getProducts } from '../../../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductCategory from '../Categories/ProductCateGory';
import './Product.css';
import ReactPaginate from 'react-paginate';

function ProductList({ onAddProductClick }) {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0); // State to manage current page
  const productsPerPage = 8; // Number of products per page
  const data = useSelector(state => state.data);
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

  const startIndex = pageNumber * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className='pd-container'>
        <h2 className='pd-heading'>PRODUCTS</h2>
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
                      <td className='product-price'>{product.price}</td>
                      <td className='product-stock'>{product.quantity}</td>
                      <div>
                      <td className='product-image'><img className='p-imag' src={`http://localhost:5000/uploads/${product.images}`} alt={product.name} /></td>

                      </div>                      <td className='product-date'>{formatDate(product.createdAt)}</td>
                      <td className='product-actions'>
                        <MdEdit className='action-edit' />
                        <MdDelete className='action-delete' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            
            </div>
            <div className='add-p-btn'>
            <button className='p-btn' onClick={onAddProductClick}>Add Product </button>

            </div>
          </div>
          <ProductCategory className='product-category' />
        </Row>
      </div>
    </>
  );
}

export default ProductList;
