import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import search from '../../../images/search.png';
import wishlist from '../../../images/heart.png';
import cart from '../../../images/cart.png';
import account from '../../../images/account.png';
import './Homenav.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">DealDone</div>
                <ul className="navbar-menu">
                    <li><Link to="/" className="Button">Home</Link></li>
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
                        {/* Correct the Link component usage */}
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
