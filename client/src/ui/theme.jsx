import { createTheme } from '@mui/material/styles';
import '@fontsource/libre-baskerville/700.css';
import '@fontsource/josefin-sans/400.css';

const theme = createTheme({
  palette: {
    title: {
      primary: '#3F7D61',
      secondary: '#F5E3BA',
    },
    text: {
      primary: '#333333',
      secondary: '#F5E3BA',
    },
    background: {
      primary: '#FEFEFE',
      secondary: '#FBF2DF',
      gradient: 'linear-gradient(327deg, #3F7D61 0%, #3F7671 100%);',
    },
  },
});

export default theme;
