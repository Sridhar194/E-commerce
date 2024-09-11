import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './components/Buyer/LandingPage/Landing';
import Signup from './components/Buyer/signup';
import Login from './components/Buyer/login';
import Home from './components/Buyer/AccountHome/home';
import Account from './components/Buyer/AccountHome/Account';  // Import Account component

function App() {
  return (
    <Routes>
      <Route path='/Landing' element={<Landingpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/Home' element={<Home />}>
        {/* Nested route for Account */}
        <Route path="account" element={<Account />} />
      </Route>
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
