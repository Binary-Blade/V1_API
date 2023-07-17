// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api_v1', // replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export const setAuthToken = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const getCart = () => api.get('/cart');

export const getOrderDetails = (orderId) => api.get(`/cart/${orderId}`);

export const deleteItemFromCart = (productId) =>
  api.delete(`/cart/${productId}`);

export const createCheckoutSession = (cartId) =>
  api.post(`/payment/checkout-session/${cartId}`, {
    cart: cartId,
  });

export default api;
