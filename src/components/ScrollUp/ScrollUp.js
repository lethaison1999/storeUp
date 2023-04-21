import React, { useState } from 'react';
import './ScrollUp.scss';
const ScrollUp = () => {
  const [scroll, setScroll] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScroll(true);
    } else if (scrolled <= 300) {
      setScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  window.addEventListener('scroll', toggleVisible);
  return (
    <>
      <div className="container-ts">
        <button type="button" className="btn-ts">
          <i
            className="fas fa-arrow-up"
            onClick={scrollToTop}
            style={{ display: scroll ? 'block' : 'none' }}
          ></i>
        </button>
      </div>
    </>
  );
};

export default ScrollUp;
