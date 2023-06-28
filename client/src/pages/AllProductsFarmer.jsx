import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import Tab_Product from '../components/allproducts_compo/Tab_Product';
import ProductPresent from '../ui/CardsPresentation';
import ProductCards from '../components/allproducts_compo/Product_Cards';
import ImageHeader from '../components/allproducts_compo/ImageHeader';

export default function AllProductsFromFarmer() {
  return (
    <>
      <NavBar />
      <Container>
        <ImageHeader />
        <Tab_Product />
        <ProductPresent numberCards={9} childrenCards={<ProductCards />} />
      </Container>
      <Footer footerPosition="contain" />
    </>
  );
}
