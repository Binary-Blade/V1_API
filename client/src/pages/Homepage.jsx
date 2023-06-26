import React from 'react';

import Footer from '../Layout/Footer/Footer';
import NavBar from '../Layout/Header/MuiNavBar';
import NewFarmer from '../components/NewFarmer';

export default function Landingpage() {
  return (
    <>
      <NavBar />
      <NewFarmer />
      <Footer />
    </>
  );
}
