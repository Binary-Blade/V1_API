import * as React from 'react';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel';
import ButtonLink from '../../ui/Button/ButtonLink';
import theme from './../../ui/theme';
import ImageHomepage1 from './../../../public/Bg_Image_Homepage1.png';
import ImageHomepage2 from './../../../public/Bg_Image_Homepage2.png';


export default function CarouselComponent() {
  const items = [
    {
      image: ImageHomepage1,
      title: 'Découvrez vos produits locaux',
      description: 'Explorez notre catalogue riche et varié',
      button: 'Les produits',
    },
    {
      image: ImageHomepage2,
      title: 'Rencontrez nos fermiers',
      description:
        'Les héros qui cultivent votre nourriture avec passion et dévouement',
      button: 'Les fermiers',
    },
  ];

  return (
    <Box
      sx={{
        pt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Carousel sx={{ width: '100%', height: '100%' }}>
        {items.map((item, i) => (
          <Box
            key={i}
            sx={{
              backgroundImage: `url(${item.image})`,
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
              flexDirection: { xs: 'column' },
              justifyContent: { xs: 'flex-end', sm: 'center' },
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                height: { xs: 'auto', sm: '89%' },
                width: { xs: '100%', sm: '25%' },
                bgcolor: 'rgba(251, 242, 223, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                m: 2,
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  color: theme.palette.title.primary,
                }}
              >
                {item.title}
              </h1>
              <p
                style={{
                  textAlign: 'center',
                  color: theme.palette.title.primary,
                }}
              >
                {item.description}
              </p>
              <ButtonLink> {item.button}</ButtonLink>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
