import React, { useEffect } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchAsyncProductsOfCategory,
  getAllProductsByCategory,
  getCategoryProductsStatus,
} from '../../store/categorySlice';
import Loader from './../../components/Loader/Loader';
import { STATUS } from '../../utils/status';
import './CategoryProductPage.scss';

const CategoryProductPage = () => {
  const dispath = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispath(fetchAsyncProductsOfCategory(category));
  }, [dispath, category]);

  return (
    <div className="cat-products py-5 bg-whitesmoke">
      <div className="container">
        <div className="cat-products-content">
          <div className="title-md">
            <h3>
              See our <span className="text-capitalize">{category.replace('-', '')}</span>{' '}
            </h3>
          </div>
          {categoryProductStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={categoryProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
