import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Image from '../../../public/carotte.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../ui/Button/ButtonLink';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TabDescriptionReview from './Description';
import theme from '../../ui/theme';

export default function FullWidthGrid() {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <Box>
        <h1>Farm Name</h1>
      </Box>
      <Container
        sx={{
          display: { xs: 'block', sm: 'block', md: 'grid' },
          gridTemplateColumns: { md: '1.3fr 2fr' },
          gridTemplateRows: { md: 'auto auto' },
          py: 2,
          bgcolor: theme.palette.background.secondary,
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: { xs: '100%', sm: '100%', md: '100%' },
            height: { xs: '200px', sm: '300px', md: '350px' },
            backgroundColor: 'grey.500',
            gridRow: { md: '1 / 2' },
            gridColumn: { md: '1 / 2' },
          }}
        />
        <Container
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%' },
            height: { xs: '200px', sm: '250px', md: '350px' },
            backgroundColor: 'grey.300',
            gridRow: { md: '1 / 3' },
            gridColumn: { md: '2 / 3' },
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 2,
              pb: 1,
            }}
          >
            <Stack
              direction="column"
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <h2>Carottes</h2>
              <h3>Variétés</h3>
              <Rating name="read-only" value={value} readOnly />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Stack>
          </Box>
          <h2>Price €/kilos</h2>
          <hr />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' }, // 'row' for small screens, 'column' for medium and larger
              justifyContent: 'space-between',
              gap: 2,
              pb: 1,
            }}
          >
            <FormControl
              sx={{ m: 1, width: { xs: 'auto', md: '25ch' } }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">Grammes</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
              />
              <FormHelperText id="outlined-weight-helper-text">
                Quantité
              </FormHelperText>
            </FormControl>
            <Button>Ajouter au panier</Button>
          </Box>
        </Container>
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '100%',
            },
            height: { xs: 'auto', sm: 'auto', md: 'auto' },
            gridRow: { md: '2 / 3' },
            gridColumn: { md: '1 / 3' },
            pt: 2,
          }}
        >
          <TabDescriptionReview/>
        </Box>
      </Container>
    </>
  );
}
