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
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/buyer/profile', {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/buyer/profile', {
                method: 'PUT', // changed from POST to PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies are sent with the request
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json(); // Parse the response
                console.log('Profile updated successfully:', data.message);
                alert(data.message); 
                console.log('Profile updated successfully');
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData.message || response.statusText);
                alert(`Error: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    return (
        <div className="account-page">
            <Header />
            <Homenav />

            <div className="content-wrapper">
                <div className="Profilesidebar">
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
                        <div className="user-form-row">
                            <div className="user-form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div className="user-form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="user-form-row">
                            <div className="user-form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="user-form-group">
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
                            <button type="edit" className='edit-button'>Edit</button>
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