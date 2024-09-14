import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CloseBtn from '../../../../components/Buttons/CloseBtn';
import './Editprdt.css';
import { updateProduct } from '../../../../actions/ProductAction'; // Adjust the import path

function EditProduct({ productId, onClose }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const categories = useSelector((state) => state.category.category);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    quantity: '',
    description: '',
    features: '',
    images: null,
    imagePreview: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length && categories.length) {
      const categoryOptions = categories.map((category) => ({
        id: category._id,
        name: category.name
      }));
      setCategoryOptions(categoryOptions);

      const fetchProduct = products.find((prd) => prd._id === productId);
      if (fetchProduct) {
        const categoryObj = categoryOptions.find(cat => cat.name === fetchProduct.category);
        setSelectedProduct(fetchProduct);
        setFormData({
          name: fetchProduct.name,
          categoryId: categoryObj ? categoryObj.id : '', // Store actual category ID
          price: fetchProduct.price,
          quantity: fetchProduct.quantity,
          description: fetchProduct.description,
          features: fetchProduct.features,
          images: null,
          imagePreview: fetchProduct.images
            ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(fetchProduct.images[0])}`
            : ''
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
    setLoading(true);
  
    // Optimistically update the local state
    const updatedProduct = { ...formData, _id: productId };
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('features', formData.features);
  
      if (formData.images) {
        formDataToSend.append('images', formData.images);
      }
  
      // Dispatch the update action
      await dispatch(updateProduct(productId, formDataToSend));
  
      toast.success('Product updated successfully');
      onClose(); // Close the modal or form after success
    } catch (error) {
      toast.error('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const getImagePublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const [publicId] = fileNameWithExtension.split('.');
    return publicId;
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
                    src={formData.imagePreview || 'https://via.placeholder.com/150'} // Fallback image
                    alt={selectedProduct.name}
                    onClick={() => document.getElementById('imageInput').click()}
                    style={{ cursor: 'pointer' }}
                  />
                  <input
                    type="file"
                    id="imageInput"
                    name="images"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="general">
                  <h3>General</h3>
                  <div className="inpt-fld">
                    <label htmlFor="name">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="categoryId">Category</label>
                    {categoryOptions.length > 0 && (
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a category</option>
                        {categoryOptions.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <label htmlFor="description">Description *</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="features">Features</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                    />
                    <label htmlFor="quantity">Stock</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
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
