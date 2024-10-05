import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Buyer/UPM/signup/signup';
import Login from './Buyer/UPM/login/login';
import LandingPage from './Buyer/LandingPage/Landing';
import Homepage from './Buyer/AccountHome/home';
import AccountPage from './Buyer/UPM/ProfileManagment/account';
import SignupSeller from './Seller/UPM/signup/signup';
import LoginSeller from './Seller/UPM/login/login';
import HomeSeller from './Seller/home/home';  // Import Seller Home component
import './index.css'; // General CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Buyer Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />  
      <Route path='/home' element={<Homepage />} />
      <Route path='/account' element={<AccountPage />} />

      {/* Seller Routes */}
      <Route path="/seller/home" element={<HomeSeller />} /> {/* Add Seller home route */}
      <Route path="/seller/signup" element={<SignupSeller />} />
      <Route path="/seller/login" element={<LoginSeller />} />
      <Route path="/seller/home" element={<LoginSeller />} />

    </Routes>
  </BrowserRouter>
);
