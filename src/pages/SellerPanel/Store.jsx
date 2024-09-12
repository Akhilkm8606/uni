import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete, MdEdit, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import '../AdminPanel/Products/List/ProductList.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Instance/axios';
import { DELETE_PRODUCT } from '../../Constants/ProductConstants';
import EditProduct from '../AdminPanel/Products/List/EditProduct'; // Adjust path as needed

function Store({ onAddProductClick }) {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // Retrieve user ID from Redux store
  const users = useSelector(state => state.auth.user);
  const sellerId = users?._id;

  console.log(sellerId, 'sellerId');
  console.log(users, 'users');

  // Pagination calculation
  const filteredProducts = sellerId
    ? products.filter(product => product.userId === sellerId)
    : products;
  
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const getImagePublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const [publicId] = fileNameWithExtension.split('.');
    return publicId;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get('/api/v1/products', { withCredentials: true });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleRowClick = (id) => {
    setEditingProductId(id);
  };

  const handleDelete = async (productId) => {
    try {
      if (window.confirm('Are you sure you want to delete this product?')) {
        await instance.delete(`/api/v1/product/${productId}`, { withCredentials: true });
        setProducts(products.filter(product => product._id !== productId));
        dispatch({
          type: DELETE_PRODUCT,
          payload: productId
        });
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const startIndex = pageNumber * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className='pd-container'>
        <h2 className='pd-heading'>PRODUCTS</h2>
        <Row className='pd-row'>
          <div className='p-outer-div'>
            <div className='products-div'>
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={<MdSkipPrevious />}
                  nextLabel={<MdSkipNext />}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  pageClassName={'pagination-item'}
                  previousClassName={'pagination-item'}
                  nextClassName={'pagination-item'}
                  breakClassName={'pagination-item'}
                  disabledClassName={'disabled'}
                />
              )}
              <Table striped bordered hover className='custom-p-table'>
                <thead>
                  <tr>
                    <th className='product-name'>Product Name</th>
                    <th className='product-category'>Category</th>
                    <th className='product-price'>Price</th>
                    <th className='product-stock'>Stock</th>
                    <th className='product-image'>Image</th>
                    <th className='product-date'>Date Of Added</th>
                    <th className='product-actions'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                   <tr
                   className='pdata-row'
                   key={product._id}
                   onClick={() => handleRowClick(product._id)}
                   style={{ cursor: 'pointer' }}
                 >
                      <td className='product-name'>{product.name}</td>
                      <td className='product-category'>{product.category}</td>
                      <td className='product-price'>{product.price}</td>
                      <td className='product-stock'>{product.quantity}</td>
                      <td className='product-image'>
                        <img
                          className='p-imag'
                          src={
                            product.images[0]
                              ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(product.images[0])}`
                              : 'https://via.placeholder.com/150'
                          }
                          alt={product.name}
                        />
                      </td>
                      <td className='product-date'>{formatDate(product.createdAt)}</td>
                     
                      <td className='product-actions'>
                        <MdDelete onClick={() => handleDelete(product._id)} className='action-delete' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </div>
      {editingProductId && (
        <EditProduct
          productId={editingProductId}
          onClose={() => setEditingProductId(null)} // Close modal
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Store;
