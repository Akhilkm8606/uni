import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios'; // Import axios for making HTTP requests
import './Product.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    features: "",
    images: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For file inputs, set the value to files array
    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Send form data to the server
      await axios.post('http://localhost:5000/seller/product', formDataToSend, {
        withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
      });

      // Clear the form after successful submission
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

  console.log(formData); // Remove this line if you don't need the console log

  return (
    <div>
      <Row>
        <h3>ADD PRODUCT</h3>
        <form onSubmit={handleSubmit} className='addProduct'>
          <div className="column">
            <input
              placeholder='Name'
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Category'
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
             
            <input
              placeholder='Brand'
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Price'
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <input
              placeholder='Quantity'
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Description'
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Features'
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Images'
              type="file"
              id="images"
              name="images"
              onChange={handleChange}
              required
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </Row>
    </div>
  );
}

export default AddProduct;
