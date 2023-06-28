import * as React from 'react';
import Box from '@mui/material/Box';
import CardFarm from './CardFarms'; // assurez-vous d'importer le bon chemin
import { Typography } from '@mui/material';
import ButtonLink from '../../ui/ButtonLink';
import theme from '../../ui/theme';

export default function ResponsiveGrid() {
  const farms = [
    {
      name: 'Ferme du Soleil Levant',
      description: 'Une description de la Ferme du Soleil Levant.',
    },
    {
      name: 'Ferme des Quatre Vents',
      description: 'Une description de la Ferme des Quatre Vents.',
    },
    {
      name: 'Ferme de la Vallée Verdoyante',
      description: 'Une description de la Ferme de la Vallée Verdoyante.',
    },
    {
      name: 'Ferme du Clair de Lune',
      description: 'Une description de la Ferme du Clair de Lune.',
    },
  ];

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          columnGap: 2,
          rowGap: 2,
          pt: 10,
          pb: 10,
          mx: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            color: theme.palette.title.primary,
            marginBottom: 2,
          }}
        >
          LES NOUVEAUX FERMIERS
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            py: 5,
            px: 5,
          }}
        >
          {farms.map((farm, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '100%', sm: '80%', md: '50%' },
                px: 2,
                py: 2,
              }}
            >
              <CardFarm nameFarm={farm.name} describeFarm={farm.description} />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <ButtonLink>Toutes les fermes</ButtonLink>
        </Box>
      </Box>
    </>
  );
}
