import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import './Sidebar.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const isSidebarOn = useSelector(getSidebarStatus);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);
  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ''}`}>
      <button type="button" className="sidebar-hide-btn" onClick={() => dispatch(setSidebarOff())}>
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">All Categories</div>
        <ul className="cat-list">
          {categories.map((category, index) => {
            return (
              <li key={index} onClick={() => dispatch(setSidebarOff())}>
                <Link to={`category/${category}`} className="cat-list-link text-capitalize ">
                  {category.replace('-', ' ')}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
