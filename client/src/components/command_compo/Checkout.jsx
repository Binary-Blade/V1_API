import React, { useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const Checkout = ({ cartId }) => {
  const stripePromise = loadStripe(
    'pk_test_51NPmMYGehlD30RMlr8EutLTSTKG5UWCGCltQvcO15NlXTax06cN5KpOTtjatz2EigqNojKRQeHkjvKUMWKHwgAih00D1Ux5Ebv'
  );

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `http://127.0.0.1:8000/api_v1/products/checkout-session/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session = res.data.session.id; // Change this line
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
