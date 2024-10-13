import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch banner images from the backend
    const fetchBannerImages = async () => {
      try {
        const response = await fetch('http://localhost:5000'); // Replace with your actual API endpoint
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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % bannerImages.length
    );
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };


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
        <button className="banner-nav-left" onClick={handlePrevClick}>
          &#10094;
        </button>
        <div className="home-banner-scroll">
          {bannerImages.length > 0 && (
            <img
              src={bannerImages[currentIndex].url}
              alt={`Banner ${currentIndex + 1}`}
              className="home-banner-image"
              onClick={handleImageChange}
            />
          )}
        </div>
        <button className="banner-nav-right" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Banner;
