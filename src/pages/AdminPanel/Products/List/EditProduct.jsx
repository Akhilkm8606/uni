import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CloseBtn from '../../../../components/Buttons/CloseBtn';
import './Editprdt.css';
import { updateProduct } from '../../../../actions/ProductAction'; // Adjust the import path

function EditProduct({ productId, onClose }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const categories = useSelector((state) => state.cate.category);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    quantity: '',
    description: '',
    features: '',
    image: null,
    imagePreview: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length && categories.length) {
      const categoryNames = categories.map((category) => category.name);
      setCategoryOptions(categoryNames);

      const fetchProduct = products.find((prd) => prd._id === productId);
      if (fetchProduct) {
        setSelectedProduct(fetchProduct);
        setFormData({
          name: fetchProduct.name,
          categoryId: fetchProduct.category,
          price: fetchProduct.price,
          quantity: fetchProduct.quantity,
          description: fetchProduct.description,
          features: fetchProduct.features,
          image: null,
          imagePreview: fetchProduct.images ? `http://localhost:5000/uploads/${fetchProduct.images}` : ''
        });
      }
    }
  }, [productId, products, categories]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    const imagePreview = type === 'file' ? URL.createObjectURL(files[0]) : formData.imagePreview;

    setFormData({
      ...formData,
      [name]: newValue,
      imagePreview
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);
      try {
        console.log('Form Data state:', formData);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('categoryId', formData.categoryId);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('features', formData.features);
        if (formData.image) {
          formDataToSend.append('image', formData.image);
        }

        // Dispatch the updateProduct action
        await dispatch(updateProduct(productId, formDataToSend));

        // Optionally handle UI feedback if needed
        toast.success('Product updated successfully');
        onClose(); // Close the form after successful update
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="edit-prdut">
      <CloseBtn onClick={onClose} />
      <div>
        <div className="page-hd">
          <h3>Edit Product</h3>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="page-cont">
            {selectedProduct && (
              <>
                <div className="thumb">
                  <img
                    src={formData.imagePreview}
                    alt={selectedProduct.name}
                    onClick={() => document.getElementById('imageInput').click()}
                    style={{ cursor: 'pointer' }}
                  />
                  <input
                    type="file"
                    id="imageInput"
                    name="image"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="general">
                  <h3>General</h3>
                  <div className="inpt-fld">
                    <label htmlFor="name">Product Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="categoryId">Category</label>
                    {categoryOptions.length > 0 && (
                      <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        {categoryOptions.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    )}
                    <label htmlFor="description">Description *</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    <label htmlFor="features">Features</label>
                    <input type="text" name="features" value={formData.features} onChange={handleChange} />
                    <label htmlFor="quantity">Stock</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                  </div>
                  <div className="sum-btn">
                    <button type="submit" disabled={loading}>
                      {loading ? 'Updating...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditProduct;
