import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import Sidebar from '../../component/Sidebar';

function Header() {
  const[profileHeading,setprofileHeading]=useState();
  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/locals/propertyFile.json')
      .then(response => response.json())
      .then(data => {
        // Update the state with navbar items from the JSON
        setprofileHeading(data.profileHeading);
      })
      .catch(error => console.error('Error fetching navbar items:', error));
  }, []);
  return (
    <div>
      <header className="header-top">
        <div className="header1">
        <FaUser className='shopping-icon'/>
        <h2 className='product-heading'> {profileHeading}</h2>
        </div>
        <div className="sidebar-toggle">
          <Sidebar/> {/* Render the Sidebar on the right */}
        </div>
      </header>
      
    </div>
  );
}

export default Header;

  
