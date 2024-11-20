// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './user/components/NavBar';
import MainPage from './user/pages/MainPage';
import Cart from './user/pages/Cart';
import Card from './user/components/Card';
import NavbarSearch from './user/components/NavbarSearch';
import SearchBarLocation from './user/components/SearchBarLocation';
import React, { useState } from 'react';
import Dashboard from './admin/pages/Dashboard';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AdminSignup from './Auth/AdminSignup';
import ProfileInfo from './user/pages/ProfileInfo';
import OrderHistory from './user/pages/OrderHistory';
import PaymentSuccess from './user/pages/PaymentSuccess';
import FeedViews from './user/pages/FeedViews';
import StoreDetails from './user/pages/StoreDetails'
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Auth/Login' element={<Login/>} />
        <Route path='/Auth/Signup' element={<Signup/>} />
        <Route path='/Auth/Admin' element={<AdminSignup/>} />
        <Route path="/" element={<MainPage />} />
        <Route path='/user/pages/ProfileInfo' element={<ProfileInfo/>} />
        <Route path='/user/pages/FeedViews' element={<FeedViews/>} />
        <Route path='/user/pages/OrderHistory' element={<OrderHistory />} />
        <Route path="/user/checkout" element={<PaymentSuccess/>} />
        <Route path="/user/components/SearchBarLocation" element={<SearchBarLocation />} />
        <Route path="/user/components/Card" element={<Card setCartItems={setCartItems} />} />
        <Route path="/user/pages/Cart" element={<Cart cartItems={cartItems} />} />
        <Route path='/user/pages/StoreDetails' element={<StoreDetails />} />
        <Route path='/Dashboard/*' element={<Dashboard/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;