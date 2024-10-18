import React, { useState, useEffect } from 'react';
import './signup.css';
import shoping from '../../Assets/images/Shopingimg.png'; 
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../../LandingPage/footer';
import Header from '../../LandingPage/Header';


const Signup = () => { 
    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State variables for dynamic content from the property file
    const [formHeading, setFormHeading] = useState('');
    const [formSubHeading, setFormSubHeading] = useState('');
    const [submitButtonLabel, setSubmitButtonLabel] = useState('');
    const [googleButtonLabel, setGoogleButtonLabel] = useState('');
    const [alreadyAccountText, setAlreadyAccountText] = useState('');
    const [loginText, setLoginText] = useState('');
    const [navbarLogo, setNavbarLogo] = useState('');
    const [navbarLinks, setNavbarLinks] = useState([]);


    useEffect(() => {
        fetch('Buyer_Property/propertyfile.json')
            .then(response => response.json())
            .then(data => {
                setFormHeading(data.signupPage.formHeading);
                setFormSubHeading(data.signupPage.formSubHeading);
                setSubmitButtonLabel(data.signupPage.submitButtonLabel);
                setGoogleButtonLabel(data.signupPage.googleButtonLabel);
                setAlreadyAccountText(data.signupPage.alreadyAccountText);
                setLoginText(data.signupPage.loginText);
                setNavbarLogo(data.navbarLogo);
                setNavbarLinks(data.navbarLinks);
             
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
            
            errors.push("Password must be strong.");
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

        if (!email ) {
            validationErrors.email  = 'Email is required';
        } else if (!validateEmail(email )) {
            validationErrors.email  = 'Please enter a valid email address';
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
            const response = await fetch('http://localhost:5000/buyer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email , phone, password }),
            });
                    
            if (response.ok) {
                alert('Account created successfully');
                // Clear form fields
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

    const handleGoogleSignup = async () => {
        alert('Google signup clicked');
    };

    return (
        <div className="signup-page">
          <header>
            <Header/>
          </header>
            <nav className="signup-navbar">
  <div className="signup-navbar-container">
    <div className="signup-navbar-logo">{navbarLogo}</div>
    <ul className="signup-navbar-menu">
      {navbarLinks.map((link, index) => (
        <li key={index}>
          <Link to={link.url}>{link.label}</Link>
        </li>
      ))}
      {/* Add the "Sign in" link */}
      <li>
        <Link to="/login">Sign in</Link>
      </li>
    </ul>
  </div>
</nav>

            <div className="banner">
                <img src={shoping} alt="Shopping bags" />
                <div className="signup-form-container">
                    <h2>{formHeading}</h2>
                    <p>{formSubHeading}</p>
                    <form className="signup-form" onSubmit={handleCreateAccount}>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}

                        <input 
                            type="text" 
                            placeholder="Email address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}

                        <input 
                            type="text" 
                            placeholder="Phone Number" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}

                        <div className="password-container" style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
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
                                onChange={(e) => setConfirmPassword(e.target.value)} 
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
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                        
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

                        <button type="submit" className="create-account-btn">{submitButtonLabel}</button>
                        <button type="button" className="google-signup-btn" onClick={() => alert('Google signup clicked')}>
                            {googleButtonLabel}
                        </button>
                    </form>
                    <p>{alreadyAccountText} <Link to="/login">{loginText}</Link></p>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
           
        </div>
    );
};

export default Signup;
