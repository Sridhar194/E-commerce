import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import search from '../Assets/images/search.png';
import wishlist from '../Assets/images/heart.png';
import cart from '../Assets/images/cart.png';
import account from '../Assets/images/account.png';
import './Homenav.css';

const Navbar = () => {
    const [navbarData, setNavbarData] = useState(null);

    useEffect(() => {
        // Fetch the Homenavbar property data from the JSON file
        fetch('Buyer_property/propertyfile.json')
        .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setNavbarData(data))
            .catch((error) => console.error('Error fetching Homenavbar property file:', error));
    }, []);

    if (!navbarData) {
        return <div>Loading...</div>; // Show loading until the data is fetched
    }

    return (
        <nav className="Homenavbar">
            <div className="Homenavbar-container">
                <div className="Homenavbar-logo">{navbarData.logo}</div>
                <ul className="Homenavbar-menu">
                    {navbarData.menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url} className="Button">{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="Homenavbar-right">
                    <div className="Homesearch-container">
                        <input
                            type="text"
                            placeholder={"What are you looking"}
                            className="Homesearch-input"
                        />
                        <button className="Homesearch-button">
                            <img src={search} alt="search" />
                        </button>   
                    </div>
                    <div className="icon-container">
                        <button className="wishlist-button">
                            <img src={wishlist} alt="wishlist" />
                        </button>
                        <button className="cart-button">
                            <img src={cart} alt="cart" />
                        </button>
                        <Link to="/account" className="cart-button">
                            <img src={account} alt="account" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
