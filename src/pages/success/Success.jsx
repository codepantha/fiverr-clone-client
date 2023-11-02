import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosRequest from '../../utils/axiosRequest';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        await axiosRequest.put('/orders', { payment_intent });
        setTimeout(() => {
          navigate('/orders');
        }, 2000)
      } catch (err) {
        console.log(err)
      }
    }

    confirmOrder();
  }, []);

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  )
}

export default Success
