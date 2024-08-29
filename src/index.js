import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Buyer/signup/signup';
import Login from './components/Buyer/login/login';
import LandingPage from './components/Buyer/LandingPage/Landing';
import './index.css'; // General CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />  
      <Route path='/Home' element={<LandingPage/>}/>
    </Routes>
  </BrowserRouter>
);
