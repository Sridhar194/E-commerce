import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import search from '../Assets/images/search.png';
import wishlist from '../Assets/images/heart.png';
import cart from '../Assets/images/cart.png';
import './Landing.css'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarData, setNavbarData] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Fetch the property file
    fetch('Buyer_property/propertyfile.json')
      .then(response => response.json())
      .then(data => setNavbarData(data.Landingnavbar))
      .catch(error => console.error('Error fetching property file:', error));
  }, []);

  if (!navbarData) {
    return null; // or a loading spinner
  }

  return (
    <nav className="buyer-Landingnavbar">
      <div className="Landingnavbar-container">
        <div className="Landingnavbar-logo">{navbarData.logo}</div>
        <ul className="Landingnavbar-menu">
          {navbarData.menuItems.map((item, index) => (
            <li key={index}>
              {item.dropdownItems ? (
                <span className="sign-in-container" onClick={toggleDropdown}>
                  <span className="Button">{item.label}</span>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <Link key={dropdownIndex} to={dropdownItem.path} className="dropdown-item">
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </span>
              ) : (
                <Link to={item.path} className="Button">{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="Landingnavbar-right">
          <div className="search-container">
            <input
              type="text"
              placeholder={navbarData.searchPlaceholder}
              className="search-input"
            />
            <button className="search-button">
              <img src={search} alt={navbarData.searchButtonAlt} />
            </button>
          </div>
          <div className="icon-container">
            <button className="wishlist-button">
              <img src={wishlist} alt={navbarData.wishlistButtonAlt} />
            </button>
            <button className="cart-button">
              <img src={cart} alt={navbarData.cartButtonAlt} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
