import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import theme from '../ui/theme';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#3F7D61',
}));

export default function NestedGrid() {
  // TODO IMPORT IN COMPONENTS
  const SocialIcon = ({ IconComponent, href }) => (
    <Grid item>
      <Box component="a" href={href}>
        <IconComponent
          sx={{
            textDecoration: 'none',
            color: theme.palette.title.primary,
            fontSize: '20px',
          }}
        />
      </Box>
    </Grid>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'static',
        bottom: 0,
        left: 0,
        width: '100%',
        transform: 'translateX(0)',
        margin: 0,
        py: 5,
        px: 8,
        backgroundColor: theme.palette.background.secondary,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid
            sx={{
              order: { xs: 2, sm: 1 },
            }}
          >
            <Item sx={{ fontSize: '16px' }}>© Copyright</Item>
          </Grid>
          <Grid
            container
            columnSpacing={4}
            sx={{
              order: { xs: 1, sm: 2 },
            }}
          >
            <SocialIcon
              IconComponent={InstagramIcon}
              href="https://instagram.com"
            />
            <SocialIcon
              IconComponent={TwitterIcon}
              href="https://twitter.com"
            />
            <SocialIcon
              IconComponent={FacebookIcon}
              href="https://facebook.com"
            />
            <SocialIcon
              IconComponent={YouTubeIcon}
              href="https://youtube.com"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
