import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ isSignUp }) {
  const [navbarLinks, setNavbarLinks] = useState([]);// Initialize as null
  const[navbarLogo, setNavbarLogo]= useState('');
  const[navbarPromoMsg,setNavbarPromoMsg]=useState('');

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/locals/propertyFile.json')
      .then(response => response.json())
      .then(data => {
        // Update the state with navbar items from the JSON
        setNavbarLinks(data.navbarLinks);
        setNavbarLogo(data.navbarLogo);
        setNavbarPromoMsg(data.navbarPromoMsg);
      })
      .catch(error => console.error('Error fetching navbar items:', error));
  }, []);

  
  return (
    <div>
      <header className="seller-top-header">
        <div className="seller-promo-message">
         {navbarPromoMsg}
        </div>
        <div className="seller-top-header-right">
          <select className="seller-language-select">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </header>
      <nav className="seller-navbar">
        <div className="seller-navbar-container">
          <div className="seller-navbar-logo">{navbarLogo}</div>
          <ul className="seller-navbar-menu">
          {navbarLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.url}>
                {isSignUp && link.label === "Sign In" ? "Sign In" : link.label}
              </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;

