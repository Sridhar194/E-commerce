import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-sections">
          <div className="footer-section">
            <address>
              <h4>Address</h4>
              <p>Sector 12, Akurdi,</p>
              <p>Pune, Maharashtra 33</p>
              <p>dealdone@gmail.com</p>
              <p>+88015-88888-9999</p>
            </address>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li><Link to='#'>My Account</Link></li>
              <li><Link to='#'>Login / Register</Link></li>
              <li><Link to='#'>Cart</Link></li>
              <li><Link to='#'>Wishlist</Link></li>
              <li><Link to='#'>Shop</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Let us help you</h4>
            <ul>
              <li><Link to='#'>Privacy Policy</Link></li>
              <li><Link to='#'>Terms Of Use</Link></li>
              <li><Link to='#'>FAQ</Link></li>
              <li><Link to='#'>Contact</Link></li>
              <li><Link to='#'>Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={15} />
            </Link>
            <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={15} />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={15} />
            </Link>
            <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={15} />
            </Link>
          </div>
          <div className="footer-copyright-container">
            <RiCopyrightLine size={10} color="#555" />
            <h6 className="footer-copyright">
              Copyright DealDone 2024. All rights reserved
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
