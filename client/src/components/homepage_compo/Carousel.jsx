import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel';
import ButtonLink from './../../ui/ButtonLink';
import theme from './../../ui/theme';
import ImageHomepage1 from './../../../public/Bg_Image_Homepage1.png';
import ImageHomepage2 from './../../../public/Bg_Image_Homepage2.png';
import ImageHomepage3 from './../../../public/Bg_Image_Homepage3.png';

export default function BoxSx() {
  const images = [ImageHomepage1, ImageHomepage2, ImageHomepage3];

  return (
    <Container fixed sx={{ pt: 3, display: 'flex', flexDirection: 'row' }}>
      <Carousel sx={{ width: '100%', height: '100%' }}>
        {images.map((image, i) => (
          <Box
            key={i}
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: {
                xs: '200px',
                sm: '25vh',
                md: '550px',
                lg: '677px',
              },
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                height: 'auto',
                width: 450,
                m: 6,
                bgcolor: 'rgba(251, 242, 223, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  color: theme.palette.title.primary,
                }}
              >
                Découvrez nos fermiers locaux : Explorez notre catalogue riche
                et varié
              </h1>
              <p
                style={{
                  textAlign: 'center',
                  color: theme.palette.title.primary,
                }}
              >
                Rencontrez nos fermiers, les héros qui cultivent votre
                nourriture avec passion et dévouement.
              </p>
              <ButtonLink> Les Produits</ButtonLink>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
