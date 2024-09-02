import React, { useState, useEffect } from 'react';
import './account.css';
import Homenav from '../AccountHome/Homenav';
import Header from '../LandingPage/Header.js';
import Footer from '../LandingPage/footer.js';
import axios from 'axios'; // Assuming axios is used for API calls

const AccountPage = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '', // Password should be handled carefully
    });

    
    useEffect(() => {
        // Fetch user data from the backend when the component mounts
        axios.get('/api/user/profile')
            .then(response => {
                // Update the state with the fetched data
                setUserData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    address: response.data.address,
                    password: '', // Do not pre-fill the password for security reasons
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated data to the backend
        axios.post('/api/user/update-profile', userData)
            .then(response => {
                console.log('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
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
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                />
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
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                      
                        <div className="form-actions">
                            <button type="button" className="cancel-button">Cancel</button>
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
