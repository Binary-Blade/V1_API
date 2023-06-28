import React from 'react';
import NavBar from '../Layout/MuiNavBar';
import Footer from '../Layout/Footer';
import { Button, Container } from '@mui/material';
import Tab_Farm from '../components/farmer_compo/Tab_Farm';
import FarmPresent from '../ui/CardsPresentation';
import ButtonMap from '../ui/Button/ButtonLink';
import FarmCards from '../components/farmer_compo/Farm_Cards';

// TODO farmPresent NumberCards = Connect to the API based on the number of Farms active
export default function Farmer() {
  return (
    <>
      <NavBar />
      <Container>
        <h1>A dedicated team to grow your company</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
        <Tab_Farm />
        <FarmPresent
          numberCards={9}
          childrenCards={<FarmCards />}
          button={<ButtonMap>Carte interactive</ButtonMap>}
        />
      </Container>
      <Footer footerPosition="contain" />
    </>
  );
}
