import React, { useEffect, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';
import shoping from '../../Assets/images/Shopingimg.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    // For fetching data from propertyfile.json
    const [navbarLinks, setNavbarLinks] = useState([]);
    const [navbarLogo, setNavbarLogo] = useState('');
    const [navbarPromoMsg, setNavbarPromoMsg] = useState('');
    const [footerAddress, setFooterAddress] = useState({});
    const [footerAccountLinks, setFooterAccountLinks] = useState([]);
    const [footerHelpLinks, setFooterHelpLinks] = useState([]);

    useEffect(() => {
        fetch('Buyer_Property/propertyfile.json')
            .then(response => response.json())
            .then(data => {
                setNavbarLinks(data.navbarLinks);
                setNavbarLogo(data.navbarLogo);
                setNavbarPromoMsg(data.navbarPromoMsg);
                setFooterAddress(data.footerAddress);
                setFooterAccountLinks(data.footerAccountLinks);
                setFooterHelpLinks(data.footerHelpLinks);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => password.length >= 8;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        let validationErrors = {};

        if (!emailOrPhone) {
            validationErrors.emailOrPhone = 'Email or Phone number is required';
        } else if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
            validationErrors.emailOrPhone = 'Please enter a valid email address or phone number';
        }

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            validationErrors.password = 'Password must be at least 8 characters long';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear errors if all validations pass

        try {
            const response = await fetch('http://192.168.137.43:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOrPhone, password }),
            });

            if (response.ok) {
                alert('Logged in successfully');
            } else {
                const errorData = await response.json();
                alert(`Error logging in: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            alert('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <header className="top-header">
                <div className="promo-message">
                    {navbarPromoMsg} <a href="#">ShopNow</a>
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
                    <div className="navbar-logo">{navbarLogo}</div>
                    <ul className="navbar-menu">
                        {navbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.url}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <div className="banner">
                <img src={shoping} alt="Shopping bags" />
                <div className="login-form-container">
                    <h2>Login</h2>
                    <p>Enter your credentials below</p>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            placeholder="Email address or Phone Number" 
                            value={emailOrPhone} 
                            onChange={(e) => setEmailOrPhone(e.target.value)} 
                        />
                        {errors.emailOrPhone && <p className="error-message">{errors.emailOrPhone}</p>}
                        <div className="password-container" style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{ paddingRight: '30px' }} 
                            />
                            <span 
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: 'black'
                                }}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.password && <p className="error-message">{errors.password}</p>}

                        <button type="button" className="forgot-password-btn">Forgot Password?</button>
                        
                        <button type="submit" className="login-btn">Log In</button>
                    </form>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
            <footer>
                <div className="footer-container">
                    <div className="footer-sections">
                        <div className="footer-section">
                            <address>
                                <h4>Address</h4>
                                {footerAddress.addressLine1}<br />
                                {footerAddress.city}, {footerAddress.state}, {footerAddress.zip}<br />
                                {footerAddress.email}<br />
                                {footerAddress.phone}
                            </address>
                        </div>
                        <div className="footer-section">
                            <h4>Account</h4>
                            <ul>
                                {footerAccountLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.url}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Let us help you</h4>
                            <ul>
                                {footerHelpLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.url}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="social-icons">
                            <FaFacebook />
                            <FaTwitter />
                            <FaInstagram />
                            <FaLinkedin />
                        </div>
                        <div className="copyright">
                            <RiCopyrightLine /> 2023 DealDone. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
