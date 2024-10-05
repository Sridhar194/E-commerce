import React, { useState } from 'react';
import './signup.css'; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaEye,FaEyeSlash,} from 'react-icons/fa';
import { RiCopyrightLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import Yourstore from '../../assets/images/Yourstore.png';
import { FcGoogle } from "react-icons/fc";
import Header from '../../component/header';


const Signup = () => { 
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => {
        const errors = [];
    
     
        if (password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password) ||
            !/[@$!%*?&#]/.test(password)) {  
            errors.push("Password must be contain atleast one uppercase,lowercase,special character.");

            }
        return errors;
    };
    const validateEmail = (email) => /^[^\s@]+@(gmail\.com|yahoo\.com|myyahoo\.com|edu\.in|gmail\.in|outlook\.com)$/.test(email);

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        let validationErrors = {};

        if (!name) {
            validationErrors.name = 'Name is required';
        } else if (!validateName(name)) {
            validationErrors.name = 'Name should contain only letters and spaces';
        }

        if (!email) {
            validationErrors.email= 'Email is required';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        if (!phone) {
            validationErrors.phone = 'Phone number is required';
        } else if (!validatePhone(phone)) {
            validationErrors.phone = 'Phone number should be exactly 10 digits';
        }

        if (!password) {
            validationErrors.password = 'Password is required';
        } else {
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                validationErrors.password = passwordErrors.join(' ');
            }
        }
    
        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        console.log(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear errors if all validations pass

        try {
            const response = await fetch('http://10.30.72.153:5000/api/seller/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email , phone, password }),
            });

            if (response.ok) {
                alert('Account created successfully');
                navigate('/login');
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
            {/* <header className="top-header">
                <div className="promo-message">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to="#">ShopNow</Link>
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
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to='#'>Contact</Link></li>
                        <li><Link to='#'>About</Link></li>
                        <li className='sign-up'>
                        <Link to="/login">Sign in</Link></li>
                    </ul>
                </div>
            </nav> */}
            <Header/>
            <div className="banner">
            <img src={Yourstore} alt="Your store" />
            <div className="signup-form-container">
                    <h2 className='heading-h'>Create an account</h2>
                    <p className='heading-p'>Enter your details below</p>
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
                                placeholder="Enter your password" 
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
                                {showPassword ? <FaEye /> :<FaEyeSlash /> }  {/* Correct icon usage */}
                            </span>
                        </div>
                        {errors.password && <p className="error-message">{errors.password}</p>}


                        <div className="password-container" style={{ position: 'relative' }}>
                        <input 
                            type={showConfirmPassword ? 'text' : 'password'}                           
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            style={{paddingRight:'30px'}}
                        />
                         <span 
                                onClick={toggleConfirmPasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color:'black' // Optional: Change color to match your design
                                }}
                            >
                                {showConfirmPassword ? <FaEye /> :<FaEyeSlash /> }  {/* Correct icon usage */}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        
                        
                        <button type="submit" className="create-account-btn">Create Account</button>
                        <button type="button" className="google-signup-btn" onClick={handleGoogleSignup}><FcGoogle className='google'/>Sign up with Google</button>
                    </form>
                    <p>Already have an account? 
                    <Link to="/seller/login" className='sign-up'> Log in</Link></p>
                    </div>
            </div>
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
                                Copyright DealDone 2024. All right reserved
                            </h6>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Signup;
