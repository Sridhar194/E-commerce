import React, { useState } from 'react';
import './signup.css';
import shoping from '../../../images/Shopingimg.png'; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiCopyrightLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


const Signup = () => { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@(gmail\.com|yahoo\.com|myyahoo\.com|edu\.in|gmail\.in|outlook\.com)$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => {
        const errors = [];
        
        if (password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password) ||
            !/[@$!%*?&#]/.test(password)) {  
            errors.push("Password must be at least 8 characters, including uppercase, lowercase, digits, and special characters.");
        }
        
        return errors;
    };


    const handleCreateAccount = async (event) => {
        event.preventDefault();
        
        let validationErrors = {};

        if (!name) {
            validationErrors.name = 'Name is required';
        } else if (!validateName(name)) {
            validationErrors.name = 'Name should contain only letters and spaces';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        if (!phone) {
            validationErrors.phone = 'Phone number is required';
        } else if (!validatePhone(phone)) {
            validationErrors.phone = 'Phone number should be exactly 10 digits';
        }

        if (!password) {
            validationErrors.password = 'Please enter the password.';
        } else {
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                validationErrors.password = passwordErrors.join(' ');
            }
        }
    

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
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
                body: JSON.stringify({ name, email, phone, password }),
            });

            if (response.ok) {
                alert('Account created successfully');
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                alert(`Error creating account: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            alert('An error occurred while creating the account. Please try again later.');
        }
    };

    return (
        <div className="signup-page">
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
                            <li><Link to="/login" className="sign-up-link">Sign in</Link></li> {/* Add a class for styling */}
                            </ul>
                    </div>
                </nav>
            <div className="banner">
                <img src={shoping} alt="Shopping bags" />
                <div className="signup-form-container">
                    <h2>Create an account</h2>
                    <p>Enter your details below</p>
                    <form className="signup-form" onSubmit={handleCreateAccount}>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                                if (validateName(e.target.value)) {
                                    setErrors((prevErrors) => {
                                        const { name, ...rest } = prevErrors;
                                        return rest;
                                    });
                                }
                            }}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                        
                        <input 
                            type="text" 
                            placeholder="Email address" 
                            value={email} 
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (validateEmail(e.target.value)) {
                                    setErrors((prevErrors) => {
                                        const { email, ...rest } = prevErrors;
                                        return rest;
                                    });
                                }
                            }}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                        
                        <input 
                            type="text" 
                            placeholder="Phone Number" 
                            value={phone} 
                            onChange={(e) => {
                                setPhone(e.target.value);
                                if (validatePhone(e.target.value)) {
                                    setErrors((prevErrors) => {
                                        const { phone, ...rest } = prevErrors;
                                        return rest;
                                    });
                                }
                            }}
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}

                        <div className="password-container" style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) =>{
                                    setPassword(e.target.value);
                                    if (validatePassword(e.target.value)) {
                                        setErrors((prevErrors) => {
                                            const { password, ...rest } = prevErrors;
                                            return rest;
                                        });
                                    }
                                }}
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

                        <div className="password-container" style={{ position: 'relative' }}>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                placeholder="Confirm Password" 
                                value={confirmPassword} 
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (password === e.target.value) {
                                        setErrors((prevErrors) => {
                                            const { confirmPassword, ...rest } = prevErrors;
                                            return rest;
                                        });
                                    }
                                }} 
                                style={{ paddingRight: '30px' }}
                            />
                            <span 
                                onClick={toggleConfirmPasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: 'black'
                                }}
                            >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        
                        <button type="submit" className="create-account-btn">Create Account</button>
                        <button type="button" className="google-signup-btn" onClick={() => alert('Google signup clicked')}>Sign up with Google</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
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
};

export default Signup;
