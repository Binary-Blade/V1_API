import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import Button from '@mui/material/Button';
import Product from './pages/Product';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Farmers from './pages/Farmers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function MyApp() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="products" element={<Product />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="farmers" element={<Farmers />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
