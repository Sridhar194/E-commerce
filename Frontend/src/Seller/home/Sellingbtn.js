import './home.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Sellingbtn() {
  const navigate=useNavigate();
  const handleNavigate = () => {
    navigate('/seller/Profile');  // Use navigate inside the callback
  };
  return (
    <div className='Selling-container'>
        <button className='Sellingbtn' onClick={handleNavigate}>Start Selling</button>
    </div>
  )
}

export default Sellingbtn