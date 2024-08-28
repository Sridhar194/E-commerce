import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Seller/signup/signup';
import Login from './components/Seller/login/login';
import Home from './components/Seller/home/home';
import './index.css'; // General CSS styles
import Productmanage from './components/Seller/productmanage/Productmanage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Signup/>} />  {/* Change this line */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} /> 
    <Route path='/home' element={<Home/>} />
    <Route path='/productmanage' element={<Productmanage/>}/>
  </Routes>
</BrowserRouter>

);
