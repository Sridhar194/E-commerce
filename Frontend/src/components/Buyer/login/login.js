import React, { useState } from 'react';
import './login.css'; // Ensure this CSS file exists
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';
import shoping from '../../../images/Shopingimg.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => password.length >= 8;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }; // <-- Missing closing curly brace added here

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
                // Redirect or perform other actions after successful login
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
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">ShopNow</a>
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
                    <div className="navbar-logo">DealDone</div>
                    <ul className="navbar-menu">
                    <li><Link to="/Home" className="sign-up-link">Home</Link></li> 
                        <li>Contact</li>
                        <li>About</li>
                        <li><Link to="/signup" className="sign-up-link">Sign up</Link></li> {/* Add a class for styling */}
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
                            style={{ paddingRight: '30px' }}  // Add padding for the eye icon
                        />
                        <span 
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color:'black' // Optional: Change color to match your design
                            }}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}  {/* Correct icon usage */}
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
                                Sector 12, Akurdi,<br />
                                Pune, Maharashtra, 33<br />
                                dealdone@gmail.com<br />
                                +88015-88888-9999
                            </address>
                        </div>
                        <div className="footer-section">
                            <h4>Account</h4>
                            <ul>
                                <li>My Account</li>
                                <li>Login / Register</li>
                                <li>Cart</li>
                                <li>Wishlist</li>
                                <li>Shop</li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Let us help you</h4>
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Terms Of Use</li>
                                <li>FAQ</li>
                                <li>Contact</li>
                                <li>Help</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-social">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={15} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter size={15} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={15} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={15} />
                            </a>
                        </div>
                        <div className="footer-copyright-container">
                            <RiCopyrightLine size={10} color="#555" />
                            <h6 className="footer-copyright">
                                Copyright DealDone 2024. All right reserved
                            </h6>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Login;
