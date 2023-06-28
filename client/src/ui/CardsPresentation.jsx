import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function PresentationCards({
  numberCards,
  childrenCards,
  button,
}) {
  const cards = Array.from({ length: numberCards }, (_, i) => i + 1);

  return (
    <Grid container spacing={2}sx={{ py: 6}}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          {childrenCards}
        </Grid>
      ))}
      <Grid item xs={12} container justifyContent="center">
        {button}
      </Grid>
    </Grid>
  );
}
