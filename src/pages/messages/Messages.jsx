import React from 'react';
import { Link } from 'react-router-dom';
import './Messages.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';
import { formatDate } from '../../utils/helper';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

  const queryClient = useQueryClient();

  const {
    isLoading,
    data: conversations,
    error
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => axiosRequest.get('/conversations').then((res) => res.data)
  });

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axiosRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    }
  });

  const handleMarkAsRead = (id) => mutate(id);

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something bad happened...</p>
        ) : (
          <table>
            <tr>
              <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {conversations.map((c) => (
              <tr
                key={c._id}
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  'active'
                }
              >
                <td>{currentUser.isSeller ? c.sellerId : c.buyerId}</td>
                <td>
                  <Link to={`/messages/${c._id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{formatDate(c.updatedAt)}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleMarkAsRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Messages;
