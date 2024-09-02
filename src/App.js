import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './components/Buyer/LandingPage/Landing';
import Signup from './components/Buyer/signup';
import Login from './components/Buyer/login';
import Home from './components/Buyer/AccountHome/home';

function App() {
  return (
    <Routes>
      <Route path='/Landing' element={<Landingpage/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/Home' element={<Home/>}/>
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
