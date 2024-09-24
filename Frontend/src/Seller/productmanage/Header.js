import React from 'react';
import { FaBoxOpen } from "react-icons/fa6";
import Sidebar from '../component/Sidebar';

function Header() {
  return (
    <div>
      <header className="header-top">
        <div className="header1">
        <FaBoxOpen className='shopping-icon'/>
        <h2 className='product-heading'> Product Management</h2>
       
        </div>
        <div className="sidebar-toggle">
          <Sidebar/> {/* Render the Sidebar on the right */}
        </div>
      </header>
      
    </div>
  );
}

export default Header;
