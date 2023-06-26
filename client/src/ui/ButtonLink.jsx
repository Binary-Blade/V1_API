import * as React from 'react';
import Button from '@mui/material/Button';
import theme from './theme';

export default function ButtonLink() {
  return (
    <Button
      variant="contained"
      href="#contained-buttons"
      sx={{
        width: 150,
        bgcolor: theme.palette.title.primary,
        color: theme.palette.title.secondary,
        fontSize: 11,
      }}
    >
      Toutes nos fermes
    </Button>
  );
}
