import React from 'react';
import { FaUser } from "react-icons/fa";
import Sidebar from '../../component/Sidebar';

function Header() {
  return (
    <div>
      <header className="header-top">
        <div className="header1">
        <FaUser className='shopping-icon'/>
        <h2 className='product-heading'> Profile</h2>
        </div>
        <div className="sidebar-toggle">
          <Sidebar/> {/* Render the Sidebar on the right */}
        </div>
      </header>
      
    </div>
  );
}

export default Header;
