import axios from 'axios';

export async function getProducts() {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api_v1/products');
    return res.data.data;
  } catch (err) {
    return console.error(err);
  }
}