import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import './home.css';

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header-message">
          <span>DealDone</span> <br/>SellerCenter
        </div>
        <GiHamburgerMenu className='menu'/>     
      </header>
      
    </div>
  );
}

export default Header;
