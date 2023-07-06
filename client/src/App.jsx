import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import ProductFarmer from './pages/AllProductsFarmer';
import ProductPage from './page_later/FarmProducts';
import ProductDetail from './pages/ProductDetail';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCards from './pages/MyCards';
import Validation from './components/command_compo/comandvalidation';
import Payment from './pages/Payment';
import OrderDetail from './components/command_compo/OrderDetail';
import Contact from './pages/Contact';
import Farmers from './page_later/Farmers';
import Checkout from './pages/Checkout';

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
            {/* GET FARMER => PRODUCT */}
            {/* <Route path="farmers" element={<Farmers />} />
            <Route path="farmers/:farmId/products" element={<ProductPage />} />
            <Route
              path="farmers/:farmId/products/:idProduct"
              element={<ProductDetail />}
            /> */}
            {/* BUY PRODUCT */}
            <Route path="cards" element={<MyCards />} />
            <Route
              path="/payment/success/:session_id"
              element={<OrderDetail />}
            />
            {/* other routes... */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
