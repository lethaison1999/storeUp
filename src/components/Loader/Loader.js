import React from 'react';
import { loader } from '../../utils/images';
import './Loader.scss';
const Loader = () => {
  return (
    <div className="container">
      <div className="loader flex align-center justify-center">
        <img src={loader} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
