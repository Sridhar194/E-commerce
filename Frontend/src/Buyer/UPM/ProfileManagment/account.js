import React, { useState, useEffect } from 'react';
import './account.css';
import Homenav from '../../AccountHome/Homenav.js'
import Header from '../../LandingPage/Header.js';
import Footer from '../../LandingPage/footer.js';
import axios from 'axios'; // Assuming axios is used for API calls

const AccountPage = () => {

    const [userData, setUserData] = useState({
        name: '', 
        phone: '', 
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/buyer/profile', {
                    withCredentials: true, // Ensure cookies are sent with the request
                });
                console.log('Fetched user data:', response.data);
                setUserData({
                    name: response.data.user.name, // Update based on API response structure
                    phone: response.data.user.phone,
                    email: response.data.user.email,
                    address: response.data.user.address,
                });
                setIsLoading(false); // Stop loading once data is fetched
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Please log in.');
                    alert('Unauthorized access. Please log in.');
                } else {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        // Real-time validation
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let fieldErrors = { ...errors };

        switch (fieldName) {
            case 'name':
                fieldErrors.name = value.trim() ? '' : 'Full Name is required';
                break;
            case 'phone':
            if (!value.trim()) {
                fieldErrors.phone = 'Phone number is required';
            } else if (value.trim().length <10) { // Minimum length check for phone number
                fieldErrors.phone = 'Phone number must be at least 10 digits';
            } else {
                fieldErrors.phone = '';
            }
            break;
            case 'email':
                fieldErrors.email = value.trim()
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? ''
                        : 'Invalid email format'
                    : 'Email is required';
                break;
            case 'address':
                fieldErrors.address = value.trim() ? '' : 'Address is required';
                break;
            default:
                break;
        }

        setErrors(fieldErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!userData.name.trim()) {
            newErrors.name = 'Full Name is required';
        }
        if (!userData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10,}$/.test(userData.phone.trim())) { // Ensures only digits and at least 10 characters
            newErrors.phone = 'Phone number must be at least 10 digits and contain only numbers';
        }
        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!userData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5000/api/buyer/profile', {
                    method: 'PUT', // changed from POST to PUT
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // const validatePhone = (phone) => /^\d{10}$/.test(phone);

                    body: JSON.stringify(userData),
                });
                if (response.ok) {
                    const data = await response.json(); // Parse the response
                    console.log('Profile updated successfully:', data.message);
                    alert(data.message); 
                } else {
                    const errorData = await response.json();
                    console.error('Error updating profile:', errorData.message || response.statusText);
                    alert(`Error: ${errorData.message || response.statusText}`);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        } else {
            console.error('Validation failed');
        }
    };

    return (
        <div className="account-page">
            <Header />
            <Homenav />

            <div className="content-wrapper">
                <div className="sidebar">
                    <h3>Manage My Account</h3>
                    <ul>
                        <li className="active">My Profile</li>
                        <li>Security</li>
                        <li>My Payment Options</li>
                    </ul>

                    <h3>My Orders</h3>
                    <ul>
                        <li>My Orders</li>
                        <li>My Cancellations</li>
                        <li>My Returns</li>
                        <li>My Order History</li>
                    </ul>

                    <h3>My Wishlist</h3>
                    <ul>
                        <li>My Wishlist</li>
                    </ul>
                </div>

                <div className="profile-section">
                    <div className="profile-header">
                        <h2>Edit Your Profile</h2>
                    </div>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                />
                                {errors.address && <span className="error-message">{errors.address}</span>}
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="save-button">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AccountPage;
