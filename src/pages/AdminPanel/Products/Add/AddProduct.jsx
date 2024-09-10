import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import './AddProduct.css'; // Import CSS file for styling
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../../actions/ProductAction';
import instance from '../../../../Instance/axios';
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const user = useSelector(state => state.auth.user);
  
  // Provide a default fallback if category is undefined
  const categoryList = useSelector((state) => state.category.category || []); // Ensure default value is an empty array
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    description: "",
    features: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    // Check if any required field is empty, including the image
    const { name, categoryId, price, quantity, description, features, image } = formData;
  
    if (!name || !categoryId || !price || !quantity || !description || !features || !image) {
      console.log('Missing field:', { name, categoryId, price, quantity, description, features, image });
      alert('Please fill in all the required fields, including an image.');
      return;
    }
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('categoryId', categoryId);
        formDataToSend.append('price', price);
        formDataToSend.append('quantity', quantity);
        formDataToSend.append('description', description);
        formDataToSend.append('features', features);
        formDataToSend.append('image', image);
        
        const response = await instance.post(`/api/v1/product/${user._id}`, formDataToSend, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
  
        if (response.data.success) {
          // Clear the form and reset form state
          setFormData({
            name: '',
            categoryId: '',
            price: '',
            quantity: '',
            description: '',
            features: '',
            image: null,
          });
          form.reset();
          alert('Product added successfully');
        } 
        else {
          // Handle any case where success is false if needed
          alert('Product could not be added. Please try again.');
        }
  
        dispatch(getProducts(response.data.product));
      } catch (error) {
        console.error('Error adding product:', error);
  
        // Show a more specific error message if available
        const errorMessage = error.response?.data?.message || 'Error adding product';
        toast.error(errorMessage, {
          autoClose: 3000,
          position: "top-center"
        });
      }
    }
  };

  return (
    <div className='p-container' >
      <Row className='add-p-row'>
        <h3 className="add-product-title">ADD PRODUCT</h3>
        <form onSubmit={handleSubmit} className='add-product-form'>
          <div className="form-column">
            <div className="form-row">
              <input
                className="form-input"
                placeholder='Name'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <select
                className="form-input"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {/* Use the default empty array fallback */}
                {category.length > 0 ? (
                  category.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
            </div>
            <div className="form-row-file">
              <div className="file-upload-container">
                <input
                  id="file-input"
                  className="file-input"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required
                />
                <div className="file-upload-box">
                  <h5>Drag & drop product image here</h5>
                  <div className="divider">
                    <span>OR</span>
                  </div>
                  <label htmlFor="file-input" className="select-files-button">
                    Select files
                  </label>
                  <small>Upload 280*280 image</small>
                </div>
              </div>
            </div>

            <div className="form-d-row">
              <input
                className="form-input"
                placeholder='Description'
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-f-row'>
              <input
                className="form-input"
                placeholder='Features'
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                className="form-input"
                placeholder='Stock'
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                placeholder='Price'
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='save-p-btn'>
            <button className="submit-button" type="submit">Save Product</button>
          </div>
        </form>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
