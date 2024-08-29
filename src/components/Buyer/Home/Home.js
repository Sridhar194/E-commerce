import React from 'react';
import './Home.css'; 
import Header from './Header.js';
import Navbar from './Navbar.js';
import Banner from './Banner.js';
import Footer from './footer.js';

const Homepage = () => {
    return (
        <div className="homepage">
            <Header/>
            <Navbar/>
            <Banner/>  

            <div className="homepage-banner">
        
            </div>

            <div className="category-section">
                <h2>Browse by Category</h2>
                <div className="category-cards">
                    {/* Placeholder for category cards */}
                    <div className="category-card">Category 1</div>
                    <div className="category-card">Category 2</div>
                    <div className="category-card">Category 3</div>
                    {/* Add more categories as needed */}
                </div>
            </div>

            <div className="flash-sales-section">
                <h2>Today's Flash Sales</h2>
                <div className="timer">
                    <span>Days</span>:<span>Hours</span>:<span>Minutes</span>:<span>Seconds</span>
                </div>
                <div className="product-cards">
                    {/* Placeholder for product cards */}
                    <div className="product-card">Product 1</div>
                    <div className="product-card">Product 2</div>
                    <div className="product-card">Product 3</div>
                    {/* Add more products as needed */}
                </div>
            </div>

            <div className="best-selling-section">
                <h2>Best Selling Products</h2>
                <div className="product-cards">
                    {/* Placeholder for best selling products */}
                    <div className="product-card">Product 1</div>
                    <div className="product-card">Product 2</div>
                    <div className="product-card">Product 3</div>
                    {/* Add more products as needed */}
                </div>
            </div>

            <div className="explore-products-section">
                <h2>Explore Our Products</h2>
                <div className="product-cards">
                    {/* Placeholder for explore products */}
                    <div className="product-card">Product 1</div>
                    <div className="product-card">Product 2</div>
                    <div className="product-card">Product 3</div>
                    {/* Add more products as needed */}
                </div>
            </div>

            <div className="new-arrivals-section">
                <h2>New Arrivals</h2>
                <div className="product-cards">
                    {/* Placeholder for new arrivals */}
                    <div className="product-card">Product 1</div>
                    <div className="product-card">Product 2</div>
                    <div className="product-card">Product 3</div>
                    {/* Add more products as needed */}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Homepage;
