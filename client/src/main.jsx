import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import * as React from 'react';
// import { createRoot } from 'react-dom/client';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@mui/material/styles';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import App from './App';
// import theme from './theme';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//     ,
//   </React.StrictMode>
// );
