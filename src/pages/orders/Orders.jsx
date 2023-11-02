import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleContact = async (order) => {
    console.log(order.buyerId, 'BUYER')
    console.log(order.sellerId, 'SELLER')
    const { buyerId, sellerId } = order;
    try {
      const res = await axiosRequest.get(`/conversations/single?buyerId=${buyerId}&sellerId=${sellerId}`)
      console.log(res.status)
      if (res.status === 200)
        navigate(`/messages/${res.data._id}`)
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axiosRequest.post('/conversations', {
          to: currentUser.isSeller ? order.buyerId : order.sellerId
        })
        console.log(res.status)
        if (res.status === 201)
          navigate(`/messages/${res.data[0]._id}`)
      }
    }
  }

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
                  <img className="message" src={images.message} alt="message" onClick={() => handleContact(item)} />
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
