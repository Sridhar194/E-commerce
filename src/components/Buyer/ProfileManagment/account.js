import React from 'react';
import './AccountPage.css';
import Header from './header.js'
import Footer from './footer.js'
import Navbar from '../Home/Navbar.js';

const AccountPage = () => {
    return (
        <div className="account-page">
            <Header/>
            <Navbar/>
            <div className="sidebar">
                <h3>Manage My Account</h3>
                <ul>
                    <li className="active">My Profile</li>
                    <li>Address Book</li>
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
                <form className="profile-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" value="Adesh" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" value="Diwate" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value="adeshdiwate33@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value="Sector-12, Akurdi, Pimpri Chinchwad" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value="Adesh@112233" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="New Password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" placeholder="Confirm New Password" />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button">Cancel</button>
                        <button type="submit" className="save-button">Save Changes</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default AccountPage;
