import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonLink from '../ui/ButtonLink';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import theme from '../ui/theme';

const Item = (props) => (
  <Paper
    sx={{
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      ...props.sx,
    }}
  >
    {props.children}
  </Paper>
);

export default function Gap() {
  return (
    <Box
      sx={{ flexGrow: 1, p: 5, bgcolor: theme.palette.background.secondary }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={6}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container direction="column" spacing={5}>
            <Grid item xs>
              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Item>2</Item>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Item>3</Item>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ButtonLink sx={{ JustifyContent: 'center' }}>Toutes les news</ButtonLink>
    </Box>
  );
}
