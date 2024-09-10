import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { MdDelete, MdEdit, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../actions/ProductAction';
import './ProductList.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './EditProduct';
import { DELETE_PRODUCT } from '../../../../Constants/ProductConstants';
import instance from '../../../../Instance/axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Function to extract the public ID from a Cloudinary image URL
const getImagePublicId = (imageUrl) => {
  const urlParts = imageUrl.split('/');
  const fileNameWithExtension = urlParts[urlParts.length - 1];
  const [publicId] = fileNameWithExtension.split('.');
  return publicId;
};

function ProductList() {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const products = useSelector((state) => state.data.products);
  const pageCount = Math.ceil(products.length / productsPerPage);
  const [editingProductId, setEditingProductId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEdit = (id) => {
    setEditingProductId(id);
  };

  const handleCloseEdit = () => {
    setEditingProductId(null);
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setProductIdToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await instance.delete(`/api/v1/product/${productIdToDelete}`, { withCredentials: true });
      
      dispatch({
        type: DELETE_PRODUCT,
        payload: productIdToDelete
      });

      toast.success('Product deleted successfully');
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const startIndex = pageNumber * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className='pd-container'>
        <h2 className='pd-heading'>PRODUCTS</h2>

        {editingProductId && (
          <>
            <div className="overlay" onClick={handleCloseEdit}></div>
            <EditProduct
              productId={editingProductId}
              onClose={handleCloseEdit}
            />
          </>
        )}

        <Row className='pd-row'>
          <div className='p-outer-div'>
            <div className='products-div'>
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
              />

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
                    <tr className='pdata-row' key={product._id}>
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
                              : 'https://via.placeholder.com/150' // Fallback image
                          }
                          alt={product.name}
                        />
                      </td>
                      <td className='product-date'>{new Date(product.createdAt).toLocaleDateString()}</td>
                      <td className='product-actions'>
                        <MdEdit onClick={() => handleEdit(product._id)} className='action-edit' />
                        <MdDelete onClick={() => handleDeleteClick(product._id)} className='action-delete' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this product?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default ProductList;
