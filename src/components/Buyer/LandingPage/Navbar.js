import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import search from '../../../images/search.png';
import wishlist from '../../../images/heart.png';
import cart from '../../../images/cart.png';
const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};


  return (
          <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">DealDone</div>
                    <ul className="navbar-menu">
                        <li><Link to="/" className="Button">Home</Link></li>
                        <li><Link to="/contact" className="Button">Contact</Link></li>
                        <li><Link to="/about" className="Button">About</Link></li>
                        <li className="sign-in-container" onClick={toggleDropdown}>
                        <span className="Button">Sign In</span>
                         {dropdownOpen && (
                       <div className="dropdown-menu show"> {/* Add the 'show' class */}
                          <ul>
                            <li><Link to="/login" className="dropdown-item">Buyer</Link></li>
                            <li><Link to="/seller" className="dropdown-item">Seller</Link></li>
                          </ul>
                     </div>
                )}
            </li>


                        
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
                        </div>
                    </div>
                </div>
            </nav>
  )
}

export default Navbar;