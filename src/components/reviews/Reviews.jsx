import React from 'react';

import Review from '../review/Review';
import './Reviews.scss';
import { useQuery } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';

const Reviews = ({ gigId }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      axiosRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      })
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? 'loading...'
        : error
        ? 'Something bad happened...'
        : data?.map((review) => <Review key={review._id} review={review} />)}
    </div>
  );
};

export default Reviews;
