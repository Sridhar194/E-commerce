import React from 'react';
import '../LandingPage/Landing.css'; 
import Header from '../LandingPage/Header.js';
import Navbar from './Homenav.js';
import Banner from '../LandingPage/Banner.js';
import Footer from '../LandingPage/footer.js';
import FlashSales from '../LandingPage/FlashSales.js';
import Category from '../LandingPage/category.js';
import BestSelling from '../LandingPage/Bestselling.js';
import Ourproducts from '../LandingPage/Ourproducts.js';
import Newarrivals from '../LandingPage/Newarrivals.js';
import AdBanner from '../LandingPage/Adbanner.js';

const Homepage = () => {
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

export default Homepage;
