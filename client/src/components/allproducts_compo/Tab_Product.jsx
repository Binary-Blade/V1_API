import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FilterList from '../../ui/TabFilterList';

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filters = {
    1: [
      'Bio',
      'Nouveau',
      'Produits frais',
    ],
    2: [
      'Fruits',
      'Légumes',
      'Viandes',
      'Produits laitiers',
      'Céréales',
      'Miel',
      'Oeufs',
      'Fromages',
      'Vins',
      'Bières',
      'Jus de fruits',
    ],
    3: [
      'Moins de 5€',
      'Entre 5€ et 10€',
      'Entre 10€ et 20€',
      "Plus de 20€",
      'Commerce équitable',
    ],
    4: [
      'En stock',
      'En pré-commande',
    ],

  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: { xs: '100%', sm: '100%', md: '100%' },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Tab label="All" sx={{ fontSize: 12 }} />
        <Tab label="Type de produits" sx={{ fontSize: 12 }} />
        <Tab label="Catégorie" sx={{ fontSize: 12 }} />
        <Tab label="Prix par kilos" sx={{ fontSize: 12 }} />
        <Tab label="Disponibilité" sx={{ fontSize: 12 }} />
       
      </Tabs>
      <FilterList
        value={value}
        filters={filters}
        filterLabels={[
          'All',
          'Type de produits',
          'Catégorie',
          'Prix par kilos',
          'Disponibilité',
        ]}
      />
    </Box>
  );
}
