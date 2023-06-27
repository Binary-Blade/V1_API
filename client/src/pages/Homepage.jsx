import React from 'react';
import Footer from '../Layout/Footer';
import NavBar from '../Layout/MuiNavBar';
import NewFarmer from '../components/NewFarmer';
import HpHeader from '../components/Carousel';
import News from '../components/News';
import { Container } from '@mui/material';

export default function Landingpage() {
  return (
    <>
      <NavBar />
      <Container>
        <HpHeader />
        <NewFarmer />
        <News />
      </Container>
      <Footer />
    </>
  );
}
