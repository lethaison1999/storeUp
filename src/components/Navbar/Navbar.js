import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import './Navbar.scss';
import CartModal from '../CartModal/CartModal';

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-cnt flex align-center">
        <div className="brand-and-togler flex align-center">
          <button
            type="button"
            className="sidebar-show-btn text-white mx-2"
            onClick={() => dispatch(setSidebarOn())}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="navbar-brand flex align-center">
            <span className="navbar-brand-ico">
              <i className="fa-solid fa-bag-shopping"></i>
            </span>
            <span className="navbar-brand-txt mx-2 fs-26">
              <span className="fw-7 ">Store</span>Up.
            </span>
          </Link>
        </div>

        <div className="navbar-collapse w-100">
          <div className="navbar-search bg-white">
            <div className="flex align-center">
              <input
                type="text"
                className="form-control fs-14"
                placeholder="Search product ...."
                onClick={(e) => handleSearch(e)}
              />
              <Link
                to={`search/${searchTerm}`}
                className="text-white search-btn flex align-center justify-center"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
          </div>
          <ul className="navbar-nav flex align-center fs-15 fw-4 font-sans-pro">
            {categories.slice(0, 8).map((category, index) => (
              <li className="nav-item no-wrap" key={index}>
                <Link to={`category/${category}`} className="nav-link text-capitalize ">
                  {category.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-cart flex align-center">
          <Link to="/cart" className="cart-btn">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-items-value">{itemsCount}</div>
            <CartModal carts={carts} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
