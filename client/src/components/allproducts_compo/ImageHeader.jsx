import * as React from 'react';
import Box from '@mui/material/Box';
import theme from './../../ui/theme';
import Image from './../../../public/Bg_Image_Homepage1.png';

const BoxSx = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: {
          xs: '15vh',
          sm: '15vh',
          md: '20vh',
          lg: '25vh',
        },
        display: 'flex',
        flexDirection: 'row',
      }}
    />
  );
};
export default BoxSx;
