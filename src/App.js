import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Buyer/signup';
import Login from './components/Buyer/login';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/Home' element={<Home/>}/>
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
