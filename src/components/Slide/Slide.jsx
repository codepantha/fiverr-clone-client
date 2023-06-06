import React from 'react';
import Slider from 'infinite-react-carousel';

import './Slide.scss';

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <section className="slide">
      <div className="slide-container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </section>
  );
};

export default Slide;
