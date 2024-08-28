import React from 'react';
import { MdOutlineAddShoppingCart } from "react-icons/md";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header1">
        <MdOutlineAddShoppingCart className='shopping-icon'/>
        <h2> Product Management</h2>
        </div>
      </header>
      
    </div>
  );
}

export default Header;
