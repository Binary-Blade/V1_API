import axios from 'axios';

export function getProducts() {
  return axios.get('http://127.0.0.1:8000/api_v1/products')
    .then(res => res.data.data)
    .catch(err => console.error(err));
}