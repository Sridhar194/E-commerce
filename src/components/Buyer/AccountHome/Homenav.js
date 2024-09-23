import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import search from '../../../images/search.png';
import wishlist from '../../../images/heart.png';
import cart from '../../../images/cart.png';
import account from '../../../images/account.png';
import './Homenav.css';

const AccountDropdown = ({ show }) => {
    return (
        <div className={`dropdown-menu ${show ? 'show' : ''}`}>
            <ul>
                <li><Link to="/account">Profile</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">DealDone</div>
                <ul className="navbar-menu">
                    <li><Link to="/home" className="Button">Home</Link></li>
                    <li><Link to="/contact" className="Button">Contact</Link></li>
                    <li><Link to="/about" className="Button">About</Link></li>
                    <li><Link to="/address" className="Button">Address</Link></li>
                </ul>
                <div className="navbar-right">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="search-input"
                        />
                        <button className="search-button">
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
                        <div className="account-container" onClick={toggleDropdown}>
                            <img src={account} alt="account" className="account-icon" />
                            {showDropdown && <AccountDropdown show={showDropdown} />}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
