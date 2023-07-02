import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import ProductFarmer from './pages/AllProductsFarmer';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCards from './pages/MyCards';
import Validation from './components/command_compo/comandvalidation';
import Payment from './pages/Payment';
import OrderDetails from './components/command_compo/OrderDetail';
import Contact from './pages/Contact';
import Farmers from './pages/Farmers';
import Checkout from './pages/Checkout';
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
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="products" element={<ProductFarmer />} />
            <Route path="farmers/product" element={<ProductPage />} />
            <Route path="farmers/product/:id" element={<ProductDetail />} />
            <Route path="cards" element={<MyCards />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="validation" element={<Validation />} />
            <Route path="orderdetails" element={<OrderDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="farmers" element={<Farmers />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
