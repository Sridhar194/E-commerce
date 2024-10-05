import React from 'react';
import Sidebar from '../../Seller/component/Sidebar';
import './home.css';

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header-message">
          <span className='dealdone'>DealDone</span> <br/>SellerCenter
        </div>
        <div className="sidebar-toggle">
          <Sidebar /> {/* Render the Sidebar on the right */}
        </div>
      </header>
    </div>
  );
}

export default Header;
