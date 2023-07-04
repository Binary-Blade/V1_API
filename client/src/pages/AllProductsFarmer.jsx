import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import Tab_Product from '../components/getProduct/Tab_Product';
import ProductCards from '../components/getProduct/Product_Farms';

export default function AllProductsFromFarmer() {
  return (
    <>
      <NavBar />
      <Container>
        <Tab_Product />
        <ProductCards />
      </Container>
      <Footer footerPosition="contain" />
    </>
  );
}
