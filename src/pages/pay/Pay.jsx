import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import axiosRequest from '../../utils/axiosRequest';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

import './Pay.scss';

const stripePromise = loadStripe("pk_test_51KEYxdC8mHmEmeEalxcIMO1FHLQqQQBalelBUqtdDDvOdhsa1LmZrizcfCOjRVh0k3kUFNiCfsLWS9wmpRC1aFs000LHrbTNFy")

const Pay = () => {
  const [clientSecret, setClientSecret] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const res = await axiosRequest.post(`/orders/create-payment-intent/${id}`)
        const data = res.data;
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    }
    createPaymentIntent();
  }, [])

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay