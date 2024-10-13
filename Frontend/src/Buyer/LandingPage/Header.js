// src/components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [content, setContent] = useState({
    promoMessage: "",
    shopNowText: "",
    shopNowLink: "",
    languages: {
      en: "",
      es: ""
    }
  });

  // useEffect to fetch the property file dynamically
  useEffect(() => {
    fetch('/Buyer_Property/propertyfile.json') // Adjust path if needed based on your setup
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the property file');
        }
        return response.json();
      })
      .then(data => setContent(data))
      .catch(error => console.error("Error fetching the property file:", error));
  }, []);

  return (
    <header className="top-header">
      <div className="promo-message">
        {content.promoMessage} <a href={content.shopNowLink}>{content.shopNowText}</a>
      </div>
      <div className="top-header-right">
        <select className="language-select">
          <option value="en">{content.languages.en}</option>
          <option value="es">{content.languages.es}</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
