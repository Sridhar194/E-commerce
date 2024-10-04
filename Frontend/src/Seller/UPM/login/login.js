import React, { useState } from 'react';
import './login.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Yourstore from '../../assets/images/Yourstore.png';
import Header from '../../component/header';
import Footer from '../../component/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => password.length >= 8;

    const handleLogin = async (event) => {
        event.preventDefault();
        let validationErrors = {};

        // Validate inputs
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

        // If there are validation errors, display them and stop submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear any existing errors
        setErrors({}); // Clear errors if all validations pass

        try {
            console.log('Logging in with:', { emailOrPhone, password }); // Log the login attempt
            const response = await fetch('http://10.30.72.194:5000/api/seller/login', {
                method: 'POST', // Ensure method is POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOrPhone, password }),
            });
            
            console.log('Response:', response); // Log the response
            
            if (response.ok) {
                alert('Logged in successfully');
                navigate('/home');
                // Handle successful login (e.g., redirect or save user info)
            } else {
                const errorData = await response.json();
                alert(`Error logging in: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Fetch error:', error); // Log any fetch errors
            alert('An error occurred while logging in. Please try again later.');
        }
    };
    return (
        <div className="seller-page login-page">
            <Header />
            <div className="banner">
                <img src={Yourstore} alt="Your store" />
                <div className="login-form-container">
                    <h2 className='heading'>Log in</h2>
                    <p className='heading-1'>Enter your credentials below</p>
                    <form className="login-form" onSubmit={handleLogin}>
                        {errors.general && <p className="error-message">{errors.general}</p>}
                        
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
                                placeholder="Enter your password"
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
                    <p>Don't have an account? <Link to="/seller/signup" className='sign-up'>Create account</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
