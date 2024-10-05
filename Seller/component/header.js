import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isSignUp }) {
  return (
    <div>
      <header className="top-header">
        <div className="promo-message">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">Shop Now</a>
        </div>
        <div className="top-header-right">
          <select className="language-select">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">DealDone Seller</div>
          <ul className="navbar-menu">
            <li>
              <Link to="Seller/home">Home</Link>
            </li>
            <li>Contact</li>
            <li>About</li>
            <li className="sign-up">
              <Link to={isSignUp ? "/signup" : "/login"}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
