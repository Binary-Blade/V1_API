import * as React from 'react';
import Box from '@mui/material/Box';
import Image from './Image';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import ButtonLink from '../ui/ButtonLink';
import theme from '../ui/theme';

export default function ResponsiveGrid() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          pt: 5,
          pb: 10,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            color: theme.palette.title.primary,
          }}
        >
          LES NOUVEAUX FERMIERS
        </Typography>
        <Grid
          container
          spacing={5}
          columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}
          sx={{ py: 5, px: 5 }}
        >
          {Array.from(Array(4)).map((_, index) => (
            <Grid xs={1} sm={1} md={1} lg={1} key={index}>
              <Image />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonLink />
        </Box>
      </Box>
    </>
  );
}
