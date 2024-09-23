import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch banner images from the backend
    const fetchBannerImages = async () => {
      try {
        const response = await fetch('172.22.32.1/api/banner-images'); // Replace with your actual API endpoint
        const data = await response.json();
        setBannerImages(data);
      } catch (error) {
        console.error('Error fetching banner images:', error);
      }
    };

    fetchBannerImages();
    
  }, []);

  useEffect(() => {
    // Set up an interval to change the banner image every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [bannerImages]);

  return (
    <div className="home-banner-container">
      <div className="home-sidebar">
        <ul className="home-sidebar-menu">
          <li>Women's Fashion</li>
          <li>Men's Fashion</li>
          <li>Electronics</li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Baby's & Toys</li>
          <li>Groceries & Pets</li>
          <li>Health & Beauty</li>
        </ul>
      </div>
      <div className="home-banner">
        <div className="home-banner-scroll">
          {bannerImages.length > 0 && (
            <img
              src={bannerImages[currentIndex].url}
              alt={`Banner ${currentIndex + 1}`}
              className="home-banner-image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
