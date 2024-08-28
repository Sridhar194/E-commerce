import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Seller/signup';
import Login from './components/Seller/login';
import Home from './components/Seller/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productmanage from './components/Seller/productmanage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path='/productmanage' element={<Productmanage/>}/>

      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
