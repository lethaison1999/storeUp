import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductSingle,
  fetchAsyncProductSingle,
  getProductSingleStatus,
} from '../../store/productSlice';
import {
  addToCart,
  setCartMessageOn,
  setCartMessageOff,
  getCartMessageStatus,
} from '../../store/cartSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import { formatPrice } from '../../utils/helpers';
import CartMessage from '../../components/CartMessage/CartMessage';

import './ProductSinglePage.scss';

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getProductSingleStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMesageStatus = useSelector(getCartMessageStatus);
  // console.log(product);
  //fetch
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
    if (cartMesageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [id, dispatch, cartMesageStatus]);

  //giam gia
  let discountedPrice = product?.price - product?.price * (product?.discountPercentage / 100);
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  //increase
  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };
  //decrease
  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  //add to cart
  const handleAddToCart = (product) => {
    let discountedPrice = product?.price - product?.price * (product.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        discountedPrice,
      })
    );
    dispatch(setCartMessageOn(true));
  };
  return (
    <>
      <main className="py-5 bg-whitesmoke">
        <div className="product-single">
          <div className="container">
            <div className="product-single-content bg-white grid">
              <div className="product-single-l">
                <div className="product-img">
                  <div className="product-img-zoom">
                    <img
                      src={product ? (product.images ? product.images[0] : '') : ''}
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="product-img-thumbs flex align-center my-2">
                    <div className="thumb-item">
                      <img
                        src={product ? (product.images ? product.images[1] : '') : ''}
                        alt=""
                        className="img-cover"
                      />
                    </div>
                    <div className="thumb-item">
                      <img
                        src={product ? (product.images ? product.images[2] : '') : ''}
                        alt=""
                        className="img-cover"
                      />
                    </div>
                    <div className="thumb-item">
                      <img
                        src={product ? (product.images ? product.images[3] : '') : ''}
                        alt=""
                        className="img-cover"
                      />
                    </div>
                    <div className="thumb-item">
                      <img
                        src={product ? (product.images ? product.images[4] : '') : ''}
                        alt=""
                        className="img-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-single-r">
                <div className="product-details font-manrope ">
                  <div className="title fs-20 fw-5">{product?.title}</div>
                  <div>
                    <p className="para fw-3 fs-15">{product?.description}</p>
                  </div>
                  <div className="info flex align-center flex-wrap fs-14">
                    <div className="rating">
                      <span className="text-orange fw-5">Rating :</span>
                      <span>{product?.rating}</span>
                    </div>
                    <div className="vert-line"></div>
                    <div className="brand">
                      <span className="text-orange fw-5">Brand :</span>
                      <span className="mx-1">{product?.brand}</span>
                    </div>
                    <div className="vert-line"></div>
                    <div className="brand">
                      <span className="text-orange fw-5">Category :</span>
                      <span className="mx-1 text-capitalize">
                        {product?.category ? product.category.replace('-', '') : ''}
                      </span>
                    </div>
                  </div>
                  <div className="price">
                    <div className="flex align-center">
                      <div className="old-price text-gray">{formatPrice(product?.price)}</div>
                      <span className="fs-14 mx-2 text-dark">Inclusive of all taxes</span>
                    </div>
                    <div className="flex align-center my-1">
                      <div className="new-price fw-5 font-sans-pro fs-24 text-orange">
                        {formatPrice(discountedPrice)}
                      </div>
                      <div className="discount bg-orange fs-13 text-white fw-6 font-sans-pro">
                        {product?.discountPercentage}% OFF
                      </div>
                    </div>
                  </div>
                  <div className="qty flex align-center my-4">
                    <div className="qty-text">Quantity:</div>
                    <div className="qty-change flex align-center mx-3">
                      <button
                        className="qty-decrease flex align-center justify-center"
                        type="button"
                        onClick={() => decreaseQty()}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <div className="qty-value flex align-center justify-center">{quantity}</div>
                      <button
                        className="qty-increase flex align-center justify-center"
                        type="button"
                        onClick={() => increaseQty()}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    {product?.stock === 0 ? (
                      <div className="qty-error text-uppercase bg-danger text-whtie fs-12 ls-1 mx-2 fw-5">
                        out off stock
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="btns">
                    <button type="button" className="add-to-cart-btn btn">
                      <i className="fas fa-shopping-cart"></i>
                      <span className="btn-text mx-2" onClick={() => handleAddToCart(product)}>
                        add to cart
                      </span>
                    </button>
                    <button type="button" className="buy-now btn mx-3">
                      <span className="btn-text">buy now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {cartMesageStatus && <CartMessage />}
      </main>
    </>
  );
};

export default ProductSinglePage;
