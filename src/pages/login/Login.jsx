import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import './Login.scss';
import axiosRequest from '../../utils/axiosRequest';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosRequest.post('/auth/login', {
        username,
        password
      });
      localStorage.setItem('currentUser', JSON.stringify(res.data))
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else setPassword(value);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input name="password" type="password" onChange={handleChange} />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
