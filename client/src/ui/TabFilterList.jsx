import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

export default function FilterList({ value, filters, filterLabels }) {
  const [selectedFilters, setSelectedFilters] = React.useState([]);

  const handleFilterChange = (event, newValue) => {
    setSelectedFilters(newValue);
  };

  const handleFilterDelete = (filterToDelete) => () => {
    setSelectedFilters((filters) =>
      filters.filter((filter) => filter !== filterToDelete)
    );
  };

  return value !== 0 ? (
    <Box sx={{ width: '100%', marginBottom: 2 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'monospace', }}>
        Filtres pour{filterLabels[value - 1]}:
      </Typography>
      <Autocomplete
        multiple
        options={filters[value]}
        value={selectedFilters}
        onChange={handleFilterChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              onDelete={handleFilterDelete(option)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" />
        )}
      />
    </Box>
  ) : null;
}
