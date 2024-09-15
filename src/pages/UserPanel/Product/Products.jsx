import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/ProductAction';
import { Card, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/UserDashBoard/Layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';
import instance from '../../../Instance/axios';
import { getCategory } from '../../../components/Redux/Slice/category';
import ReactPaginate from 'react-paginate';
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.data);
  const categoryList = useSelector((state) => state.category.category || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/v1/categories', { withCredentials: true });
        dispatch(getCategory(response.data.categories || []));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (products.length === 0) return;

    const minProductPrice = Math.min(...products.map(product => product.price));
    const maxProductPrice = Math.max(...products.map(product => product.price));

    const ranges = [];
    for (let i = minProductPrice; i <= maxProductPrice; i += 1000) {
      ranges.push({ min: i, max: i + 1000 });
    }
    setPriceRanges(ranges);
  }, [products]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.categoryId));
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPriceRanges.some(range => product.price >= range.min && product.price <= range.max);
      });
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedPriceRanges, products]);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePriceRangeClick = (range) => {
    if (selectedPriceRanges.some(r => r.min === range.min && r.max === range.max)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(r => r.min !== range.min || r.max !== range.max));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const indexOfLastProduct = (pageNumber + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const getImagePublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const [publicId] = fileNameWithExtension.split('.');
    return publicId;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <Row>
            <h3>PRODUCTS</h3>
          </Row>

          <div className='filters'>
            <div className='categoryList'>
              {categoryList.length > 0 ? (
                categoryList
                  .filter(item => item !== null)
                  .map((item) => (
                    <div className='category' key={item._id}>
                      <p className='cateitems'>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(item._id)}
                          onChange={() => handleCategoryClick(item._id)}
                        />
                        <span>{item.name}</span>
                      </p>
                    </div>
                  ))
              ) : (
                <p>Loading categories...</p>
              )}
            </div>

            <div className='price-filter'>
              {priceRanges.map((range, index) => (
                <div key={index}>
                  <p className='cateitems'>
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.some(r => r.min === range.min && r.max === range.max)}
                      onChange={() => handlePriceRangeClick(range)}
                    />
                    {`₹${range.min} - ₹${range.max}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='products-container'>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <div className='product-card' key={index}>
                  <Link className='link' to={`/product/${product._id}`}>
                    <Card className='cards'>
                      <div className='media-img'>
                        <img
                          className='p-img'
                          src={
                            product.images[0]
                              ? product.images[0].startsWith('http')
                                ? `https://res.cloudinary.com/dbyfurx53/image/upload/${getImagePublicId(product.images[0])}`
                                : `https://res.cloudinary.com/dbyfurx53/image/upload/${product.images[0]}`
                              : 'https://via.placeholder.com/150'
                          }
                          alt={product.name}
                        />
                      </div>
                      <div className='content'>
                        <p>{product.name}</p>
                        <div className='price-n-rating'>
                          <ReactStars value={parseFloat(product.rating) || 0} count={5} isHalf={true} />
                          <span>{`₹${product.price}`}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <p>No products available for the selected category and price range</p>
            )}
          </div>

          <ReactPaginate
  previousLabel={<MdSkipPrevious />}
  nextLabel={<MdSkipNext />}
  pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
  onPageChange={({ selected }) => setPageNumber(selected)}
  containerClassName={'pagination'}
  activeClassName={'active'}
  previousClassName={'previous'}
  nextClassName={'next'}
/>

        </div>
      )}
    </>
  );
}

export default Products;
