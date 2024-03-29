import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './Orders.scss';
import images from '../../constants/images';
import axiosRequest from '../../utils/axiosRequest';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, data, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axiosRequest.get('/orders').then((res) => res.data)
  });

  const navigate = useNavigate();

  const handleContact = async (order) => {
    const { buyerId, sellerId } = order;
    try {
      const res = await axiosRequest.get(
        `/conversations/single?buyerId=${buyerId}&sellerId=${sellerId}`
      );
      if (res.status === 200) navigate(`/messages/${res.data._id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axiosRequest.post('/conversations', {
          to: currentUser.isSeller ? order.buyerId : order.sellerId
        });
        if (res.status === 201) navigate(`/messages/${res.data._id}`);
      }
    }
  };

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
                <td>{item.price}</td>
                <td>
                  <img
                    className="message"
                    src={images.message}
                    alt="message"
                    onClick={() => handleContact(item)}
                  />
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
