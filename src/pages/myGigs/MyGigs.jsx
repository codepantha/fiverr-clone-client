import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import './MyGigs.scss';
import images from '../../constants/images';
import useCurrentUser from '../../hooks/userLoggedIn';
import axiosRequest from '../../utils/axiosRequest';

function MyGigs() {
  const currentUser = useCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () => {
      if (currentUser?.isSeller) {
        return axiosRequest
          .get(`/gigs?userId=${currentUser._id}`)
          .then((res) => {
            return res.data.gigs;
          });
      }

      return axiosRequest.get(`/orders`).then((res) => res.data);
    }
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(['myGigs'])
  });

  const handleDelete = (id) => mutation.mutate(id);

  return (
    <div className="myGigs">
      {isLoading ? (
        'loading...'
      ) : error ? (
        'error'
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? 'Gigs' : 'Orders'}</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                {currentUser.isSeller && <th>Sales</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="image" src={gig.cover || gig.img} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  {currentUser.isSeller && <td>{gig.sales}</td>}
                  <td>
                    <img
                      className="delete"
                      src={images.deleteIcon}
                      alt=""
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
