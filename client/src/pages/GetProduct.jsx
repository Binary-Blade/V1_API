import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import ProductPresentation from '../components/getProduct/ProductDetails';

export default function AllProductsFromFarmer() {
  return (
    <>
      <NavBar />
      <Container>
        <ProductPresentation />
      </Container>
      <Footer footerPosition="contain" />
    </>
  );
}
