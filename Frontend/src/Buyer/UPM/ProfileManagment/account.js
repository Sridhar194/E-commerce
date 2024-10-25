import React, { useState, useEffect } from 'react';
import './account.css';
import Homenav from '../../AccountHome/Homenav.js';
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
    const [sidebarData, setSidebarData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/buyer/profile', {
                    withCredentials: true,
                });
                console.log('Fetched user data:', response.data);
                setUserData({
                    name: response.data.user.name,
                    phone: response.data.user.phone,
                    email: response.data.user.email,
                    address: response.data.user.address,
                });
                setIsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Please log in.');
                    alert('Unauthorized access. Please log in.');
                } else {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };

        const fetchSidebarData = async () => {
            try {
                const response = await fetch('Buyer_Property/propertyfile.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch sidebar data');
                }
                const data = await response.json();
                setSidebarData(data);
            } catch (error) {
                console.error('Error fetching sidebar data:', error);
            }
        };

        fetchUserData();
        fetchSidebarData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/buyer/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json();
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
    };
    
    return (
        <div className="account-page">
            <Header />
            <Homenav />

            <div className="content-wrapper">
                <div className="Profilesidebar">
                    <h3>{sidebarData?.Account?.manageMyAccount}</h3>
                    <ul>
                        <li className="active">{sidebarData?.Account?.myProfile}</li>
                        <li>{sidebarData?.Account?.security}</li>
                        <li>{sidebarData?.Account?.myPaymentOptions}</li>
                    </ul>

                    <h3>{sidebarData?.Account?.myOrders}</h3>
                    <ul>
                        <li>{sidebarData?.Account?.myOrders}</li>
                        <li>{sidebarData?.Account?.myCancellations}</li>
                        <li>{sidebarData?.Account?.myReturns}</li>
                        <li>{sidebarData?.Account?.myOrderHistory}</li>
                    </ul>

                    <h3>{sidebarData?.Account?.myWishlist}</h3>
                    <ul>
                        <li>{sidebarData?.Account?.myWishlist}</li>
                    </ul>
                </div>

                <div className="profile-section">
                    <div className="profile-header">
                        <h2>{sidebarData?.Account?.editYourProfile}</h2>
                    </div>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="user-form-row">
                            <div className="user-form-group">
                                <label>{sidebarData?.Account?.name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="user-form-group">
                                <label>{sidebarData?.Account?.phone}</label>
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
                                <label>{sidebarData?.Account?.email}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="user-form-group">
                                <label>{sidebarData?.Account?.address}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="edit" className='edit-button'>{sidebarData?.Account?.edit}</button>
                            <button type="submit" className="save-button">{sidebarData?.Account?.saveChanges}</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AccountPage;
