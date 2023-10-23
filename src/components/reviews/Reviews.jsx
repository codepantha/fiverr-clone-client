import React from 'react';

import Review from '../review/Review';
import './Reviews.scss';

const Reviews = ({ gigId }) => {
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      <Review />
    </div>
  );
};

export default Reviews;
