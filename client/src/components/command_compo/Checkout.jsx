import React, { useState, useContext } from 'react'; // Importer useContext
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authContext'; // Importer AuthContext

const stripePromise = loadStripe(
  'pk_test_51NPmMYGehlD30RMlr8EutLTSTKG5UWCGCltQvcO15NlXTax06cN5KpOTtjatz2EigqNojKRQeHkjvKUMWKHwgAih00D1Ux5Ebv'
);

const Checkout = ({ cartId }) => {
  const [orderId, setOrderId] = useState(null);
  const { authToken } = useContext(AuthContext); // Obtenir le token depuis le contexte

  const handleClick = async (event) => {
    event.preventDefault();
    console.log('cartId:', cartId);
    try {
      const orderResponse = await axios.post(
        `http://127.0.0.1:8000/api_v1/payment/checkout-session/${cartId}`,
        {
          cart: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Utiliser le token depuis le contexte
          },
        }
      );
      setOrderId(orderResponse.data.order._id);
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: orderResponse.data.session,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Checkout
    </Button>
  );
};

export default Checkout;
