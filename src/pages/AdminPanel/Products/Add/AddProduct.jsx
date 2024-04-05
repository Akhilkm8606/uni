// AddProduct.jsx

import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import './AddProduct.css'; // Import CSS file for styling

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    features: "",
    images: null
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

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post('http://localhost:5000/seller/product', formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      setFormData({
        name: "",
        category: "",
        brand: "",
        price: "",
        quantity: "",
        description: "",
        features: "",
        images: null
      });

      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <Row>
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
            <input
              className="form-input"
              placeholder='Category'
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
            
             <div className="form-row"> 
            
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
          
       
          <div className="form-row">
            <input
              className="form-input"
              placeholder='Quantity'
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
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
          <div className="form-row">

            <input
              className="form-input"
              placeholder='Features'
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="file"
              name="images"
              onChange={handleChange}
              required
            />
         
            </div>



          </div>
         
          <div>
          <button className="submit-button" type="submit">Submit</button>

          </div>
        </form>
      </Row>
    </div>
  );
}

export default AddProduct;
