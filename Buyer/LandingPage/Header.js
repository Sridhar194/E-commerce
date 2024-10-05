// src/components/Header.js
import React, { useState , useEffect } from 'react';
import'./Header.css';

const Header = () => {
  const[promoMessage,setpromoMessage]=useState();
  const[shopnowbt,setshopnowbt]=useState();


  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('./Buyer_Property/propertyfile.json')
      .then(response => response.json())
      .then(data => {
        // Update the state with navbar items from the JSON
        setpromoMessage(data.promoMessage);
        setshopnowbt(data.shopnowbt)
        
      })
      .catch(error => console.error('Error fetching navbar items:', error));
  }, []);  return (
    <header className="top-header">
      <div className="promo-message">{promoMessage} <ul> {shopnowbt}</ul>
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
