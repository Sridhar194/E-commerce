// src/components/Header.js
import React from 'react';
import'./Header.css';

const Header = () => {
  return (
    <header className="top-header">
      <div className="promo-message">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">ShopNow</a>
      </div>
      <div className="top-header-right">
        <select className="language-select">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
