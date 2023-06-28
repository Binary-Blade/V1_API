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
      'Naturel',
      'Sans pesticides',
      'Sans OGM',
      'Fait maison',
      'Produits frais',
    ],
    2: [
      'Proche de moi',
      'Dans ma région',
      'Dans ma ville',
      'Dans mon département',
    ],
    3: [
      'Label Rouge',
      'Agriculture Biologique',
      'Indication Géographique Protégée',
      "Appellation d'Origine Protégée",
      'Commerce équitable',
    ],
    4: [
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
        }}
      >
        <Tab label="All" sx={{ fontSize: 12 }} />
        <Tab label="Type de produits" sx={{ fontSize: 12 }} />
        <Tab label="Localisation" sx={{ fontSize: 12 }} />
        <Tab label="Label" sx={{ fontSize: 12 }} />
        <Tab label="Catégorie" sx={{ fontSize: 12 }} />
      </Tabs>
      <FilterList
        value={value}
        filters={filters}
        filterLabels={[
          'All',
          'Type de produits',
          'Localisation',
          'Label',
          'Catégorie',
        ]}
      />
    </Box>
  );
}
