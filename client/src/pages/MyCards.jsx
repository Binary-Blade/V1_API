import React from 'react';
import Footer from '../Layout/Footer';
import NavBar from '../Layout/MuiNavBar';
import MyCards from '../components/command_compo/MyCarts';
import { Container } from '@mui/material';

export default function Landingpage() {
  return (
    <>
      <NavBar />
      <Container>
        <MyCards />
      </Container>
      <Footer footerPosition="fixed" />
    </>
  );
}
