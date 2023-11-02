import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Message.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';

const Message = () => {
  const queryClient = useQueryClient();
  const msgRef = useRef();

  const { id: conversationId } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axiosRequest.get(`/messages/${conversationId}`).then((res) => {
        return res.data;
      }),
  });

  const { mutate, isLoading: postIsLoading } = useMutation({
    mutationFn: (message) => {
      return axiosRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      // Set postIsLoading to false when the message is sent successfully
      mutate(false)
    },
  });

  const handleSubmit = () => {
    mutate({
      conversationId,
      desc: msgRef.current.value
    });
    msgRef.current.value = ''
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        {isLoading ? (
          'loading...'
        ) : error ? (
          'Something went wrong!'
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <div className="write">
          <textarea ref={msgRef} type="text" placeholder="write a message" />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
