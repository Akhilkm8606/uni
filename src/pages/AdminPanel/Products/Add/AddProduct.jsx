import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import './AddProduct.css'; // Import CSS file for styling
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../../actions/ProductAction';

function AddProduct() {
  const user = useSelector(state => state.auth.user);
  const category = useSelector(state => state.cate.category);

  const dispatch = useDispatch()

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

  console.log(formData, 'Form Data');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(formData, 'Form Data');

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('categoryId', formData.categoryId);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('features', formData.features);
        formDataToSend.append('image', formData.image);

        const response = await axios.post(`http://localhost:5000/addproduct/${user._id}`, formDataToSend, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        console.log(response.data.product);
        dispatch(getProducts(response.data.product));
        setFormData(response.data.product); // Reset form state
        form.reset();
        alert('Product added successfully');
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
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
                {category.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
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
    <h5>Drag &amp; drop product image here</h5>
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
      
    </div>
  );
}

export default AddProduct;
