import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import NavBar from '../Layout/MuiNavBar';
import axios from 'axios'; // Assurez-vous d'avoir installé axios via npm

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api_v1/products');
        setProducts(res.data.data);
        console.log('res.data.data :', res.data.data); // axios stocke les données dans res.data, pas besoin de res.json()
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  console.log('products:', products);
  return (
    <>
      <NavBar />
      <div className={styles.product}>
        <h1>List of Products</h1>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product._id}>
              <h2 className={styles.productH2}>{product.name}</h2>
              <p className={styles.productP}>{product.description}</p>
            </div>
          ))}
      </div>
    </>
  );
}
