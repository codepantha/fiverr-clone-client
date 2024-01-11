import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'https://gighouse.onrender.com/api/v1',
  withCredentials: true
});

export default axiosRequest;
