import React from 'react';

import Footer from '../Layout/Footer/Footer';
import NavBar from '../Layout/Header/MuiNavBar';
import NewFarmer from '../components/NewFarmer';
import HpHeader from '../components/HomePageHeader';

export default function Landingpage() {
  return (
    <>
      <NavBar />
      <HpHeader/>
      <NewFarmer />
      <Footer />
    </>
  );
}
