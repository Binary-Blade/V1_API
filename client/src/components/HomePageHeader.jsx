import * as React from 'react';
import Box from '@mui/material/Box';
import ImageHomepage from './../../public/Bg_Image_Homepage.png';

export default function BoxSx() {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundImage: ImageHomepage,
      }}
    />
  );
}
