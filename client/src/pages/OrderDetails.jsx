import React from 'react';
import Footer from '../Layout/Footer';
import NavBar from '../Layout/MuiNavBar';
import OrderDetail from '../components/command_compo/OrderDetail';
import { Container } from '@mui/material';

export default function Landingpage() {
  return (
    <>
      <NavBar />
      <Container>
        <OrderDetail />
      </Container>
      <Footer footerPosition="fixed" />
    </>
  );
}
