import React from 'react';
import { Link } from 'react-router-dom';
import './Orders.scss';
import images from '../../constants/images';
import { useQuery } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';

const Orders = () => {
  const currentUser =
    JSON.stringify(localStorage.getItem('currentUser')) || null;

  const { isLoading, data, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axiosRequest.get('/orders').then((res) => res.data)
  });

  console.log({ data });

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        {isLoading ? (
          <p>loading...</p>
        ) : error ? (
          'error'
        ) : (
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data.map((item) => (
              <tr key={item._id}>
                <td>
                  <img className="image" src={item.img} alt="" />
                </td>
                <td>{item.title}</td>
                <td>
                {item.price}
                </td>
                <td>
                  <img className="message" src={images.message} alt="" />
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
