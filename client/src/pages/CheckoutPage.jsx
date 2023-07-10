import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import AdressCheckOut from '../components/command_compo/Checkout';
// TODO farmPresent NumberCards = Connect to the API based on the number of Farms active
export default function Farmer() {
  return (
    <>
      <NavBar />
      <Container>
        <AdressCheckOut />
      </Container>
      <Footer footerPosition="fixed" />
    </>
  );
}
