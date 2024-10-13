import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homenav.css';

const Navbar = () => {
    const [navbarData, setNavbarData] = useState(null);

    useEffect(() => {
        // Fetch the navbar property data from the JSON file
        fetch('Buyer_property/propertyfile.json')
        .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setNavbarData(data))
            .catch((error) => console.error('Error fetching navbar property file:', error));
    }, []);

    if (!navbarData) {
        return <div>Loading...</div>; // Show loading until the data is fetched
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">{navbarData.logo}</div>
                <ul className="navbar-menu">
                    {navbarData.menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url} className="Button">{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="navbar-right">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder={navbarData.searchPlaceholder}
                            className="search-input"
                        />
                        <button className="search-button">
                            <img src={navbarData.icons.search} alt="search" />
                        </button>   
                    </div>
                    <div className="icon-container">
                        <button className="wishlist-button">
                            <img src={navbarData.icons.wishlist} alt="wishlist" />
                        </button>
                        <button className="cart-button">
                            <img src={navbarData.icons.cart} alt="cart" />
                        </button>
                        <Link to="/account" className="cart-button">
                            <img src={navbarData.icons.account} alt="account" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
