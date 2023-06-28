import React from 'react';
import Footer from '../Layout/Footer';
import NavBar from '../Layout/MuiNavBar';
import NewFarmer from '../components/homepage_compo/NewFarmer';
import HpHeader from '../components/homepage_compo/Carousel';
import News from '../components/homepage_compo/News';
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
