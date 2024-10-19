import React, { useState , useEffect } from 'react';
import './signup.css'; 
import { FaEye,FaEyeSlash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import Yourstore from '../../assets/images/Yourstore.png';
import { FcGoogle } from "react-icons/fc";
import Header from '../../component/header';
import Footer from '../../component/Footer';



const Signup = () => { 
    const navigate = useNavigate();//for navigate
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const [signupHeading, setSignupHeading] = useState([]); // Initialize as an empty array
    const[signuploginHeading,setsignuploginHeading]=useState();

    useEffect(() => {
        fetch('/locals/propertyFile.json')
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                setSignupHeading(data.signupHeading || []);
                setsignuploginHeading(data.signuploginHeading);
            })
            .catch(error => console.error('Error fetching signup headings:', error));
    }, []);
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }; 
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
            const response = await fetch('http://localhost:5000/seller/register', {
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
            <Header/>
            <div className="banner">
            <img src={Yourstore} alt="Your store" />
            <div className="signup-form-container">
            {signupHeading.length > 0 && ( // Check if signupHeading has items
                <>
                    <h2 className='heading-h'>{signupHeading[0].heading1}</h2>
                    <p className='heading-p'>{signupHeading[0].heading2}</p>
                </>
            )}      

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
                    <p>
                        Already have an account? 
                        <Link to="/seller/login" className='sign-up'> Log in</Link>
                    </p>
                    </div>
            </div>
           <Footer/>
        </div>
    );
}

export default Signup;
