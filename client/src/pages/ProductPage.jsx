import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import PresentationProduct from '../components/getProduct/AllProductsFarmer';
// TODO farmPresent NumberCards = Connect to the API based on the number of Farms active
export default function Farmer() {
  return (
    <>
      <NavBar />
      <Container>
        <PresentationProduct />
      </Container>
      <Footer footerPosition="fixed" />
    </>
  );
}
