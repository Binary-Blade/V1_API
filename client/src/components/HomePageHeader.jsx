import * as React from 'react';
import Box from '@mui/material/Box';
import ImageHomepage from './../../public/Bg_Image_Homepage.png';

export default function BoxSx() {
  return (
    <Box
      sx={{
        width: {
          xs: '100vw',
          sm: '100vw',
        },
        height: {
          xs: '25vh',
          sm: '35vh',
          md: '35vh',
        },
        backgroundImage: `url(${ImageHomepage})`,
        backgroundSize: {
          xs: 'contain', // l'image reste entièrement visible sans être déformée sur les petits et moyens écrans
          md: '100% auto', // sur les grands écrans, l'image prend toute la largeur de la boîte
        }, // to ensure that the background image covers the box
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // to avoid repeating the image
      }}
    />
  );
}
