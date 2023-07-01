import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import NavBar from '../Layout/MuiNavBar';
import { getProducts } from '../api/products'; // Assurez-vous d'avoir importé la fonction

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
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
