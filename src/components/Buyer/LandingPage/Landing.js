import React from 'react';
import './Landing.css'; 
import Header from './Header.js';
import Navbar from './Navbar.js';
import Banner from './Banner.js';
import Footer from './footer.js';
import FlashSales from './FlashSales.js';
import Category from './category.js';
import BestSelling from './Bestselling.js';
import Ourproducts from './Ourproducts.js';
import Newarrivals from './Newarrivals.js';
import AdBanner from './Adbanner.js';

const LandingPage = () => {
    return (
        <div className="homepage">
            <Header/>
            <Navbar/>
            <Banner/>  
            <FlashSales/>
            <Category/>
            <BestSelling/>
            <AdBanner/>
            <Ourproducts/>
            <Newarrivals/>

            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default LandingPage;
