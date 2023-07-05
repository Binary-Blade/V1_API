// Fichier Checkout.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';

const stripePromise = loadStripe(
  'pk_test_51NPmMYGehlD30RMlr8EutLTSTKG5UWCGCltQvcO15NlXTax06cN5KpOTtjatz2EigqNojKRQeHkjvKUMWKHwgAih00D1Ux5Ebv'
);

const Checkout = ({ cartId }) => {
  const [orderId, setOrderId] = useState(null);

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const orderResponse = await axios.post(
        `http://127.0.0.1:8000/api_v1/cart/create`,
        {
          cart: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderId(orderResponse.data.data.order._id);

      const sessionResponse = await axios.post(
        `http://127.0.0.1:8000/api_v1/cart/checkout-session/${orderId}`,
        {
          stripeToken:
            'pk_test_51NPmMYGehlD30RMlr8EutLTSTKG5UWCGCltQvcO15NlXTax06cN5KpOTtjatz2EigqNojKRQeHkjvKUMWKHwgAih00D1Ux5Ebv',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session = sessionResponse.data.session.id;
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
      console.log(err.config);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Checkout
    </Button>
  );
};

export default Checkout;
