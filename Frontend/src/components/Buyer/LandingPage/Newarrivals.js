import React from 'react';
import './Newarrivals.css';

const NewArrivals = () => {
    return (
        <div className="new-arrivals-section">
            <div className="banners-container">
                <div className="vertical-banner">
                    <img src="/path/to/vertical-banner.jpg" alt="Vertical Banner" />
                </div>
                <div className="small-banners">
                    <div className="small-banner">
                        <img src="/path/to/small-banner1.jpg" alt="Small Banner 1" />
                    </div>
                    <div className="small-banner">
                        <img src="/path/to/small-banner2.jpg" alt="Small Banner 2" />
                    </div>
                </div>
            </div>
            <div className="new-arrivals">
                <h2>New Arrivals</h2>
                <div className="new-arrivals-grid">
                    {/* Replace with your product cards or dummy data */}
                    <div className="new-arrival-card">
                        <img src="/path/to/product1.jpg" alt="Product 1" />
                        <h3>Product Name 1</h3>
                        <p>$10.00</p>
                    </div>
                    <div className="new-arrival-card">
                        <img src="/path/to/product2.jpg" alt="Product 2" />
                        <h3>Product Name 2</h3>
                        <p>$20.00</p>
                    </div>
                    <div className="new-arrival-card">
                        <img src="/path/to/product3.jpg" alt="Product 3" />
                        <h3>Product Name 3</h3>
                        <p>$30.00</p>
                    </div>
                    {/* Add more product cards as needed */}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
