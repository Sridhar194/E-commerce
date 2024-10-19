import React, { useEffect, useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import shoping from '../../Assets/images/Shopingimg.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from '../../LandingPage/footer';
import Header from '../../LandingPage/Header';

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    // For fetching data from propertyfile.json
    const [navbarLinks, setNavbarLinks] = useState([]);
    const [navbarLogo, setNavbarLogo] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch('Buyer_Property/propertyfile.json')
            .then(response => response.json())
            .then(data => {
                setNavbarLinks(data.navbarLinks);
                setNavbarLogo(data.navbarLogo);
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
            console.log('Logging in with:', { emailOrPhone, password }); // Log the login attempt
            const response = await fetch('http://localhost:5000/buyer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important for including cookies
                body: JSON.stringify({ emailOrPhone, password }),
            });
            
            if (response.ok) {
                alert('Logged in successfully');
                navigate('/home'); // Redirect to the home page
            } else {
                const errorData = await response.json();
                alert(`Error logging in: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while logging in. Please try again later.'); 
        }
    };

    return (
        <div className="login-page">
            <div>
                <header>
                    <Header/>
                </header>
            </div>

            <nav className="login-navbar">
                <div className="login-navbar-container">
                    <div className="login-navbar-logo">{navbarLogo}</div>
                    <ul className="login-navbar-menu">
                        {navbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.url}>{link.label}</Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
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
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Login;
