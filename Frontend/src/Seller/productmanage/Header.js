import React, { useEffect, useState } from 'react';
import { FaBoxOpen } from "react-icons/fa6";
import Sidebar from '../component/Sidebar';

function Header() {
  const[productHeading,setproductHeading]=useState();
  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/locals/propertyFile.json')
      .then(response => response.json())
      .then(data => {
        // Update the state with navbar items from the JSON
        setproductHeading(data.productHeading);
      })
      .catch(error => console.error('Error fetching navbar items:', error));
  }, []);
  return (
    <div>
      <header className="header-top">
        <div className="header1">
        <FaBoxOpen className='shopping-icon'/>
        <h2 className='product-heading'>Product Management</h2>
       
        </div>
        <div className="sidebar-toggle">
          <Sidebar/> {/* Render the Sidebar on the right */}
        </div>
      </header>
      
    </div>
  );
}

export default Header;