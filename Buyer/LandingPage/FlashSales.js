import React, { useState, useEffect } from 'react';
import './FlashSales.css';
import { FaHeart } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const itemsPerPage = 2; // Updated to show 5 products

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/buyer/flashsales');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but received:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching flash sales data:', error);
        setProducts([]);
      }
    };

    fetchFlashSales();

    const countdownInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const totalSeconds =
          prevTime.days * 24 * 60 * 60 +
          prevTime.hours * 60 * 60 +
          prevTime.minutes * 60 +
          prevTime.seconds - 1;

        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleNext = () => {
    if (currentIndex < Math.ceil(products.length / itemsPerPage) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flash-sales">
      <div className="Flashheader">
        <h2>Flash Sales</h2>
        <div className="countdown">
          <div>
            <span>{String(timeRemaining.days).padStart(2, '0')}</span>
            <span>Days</span>
          </div>
          <div>
            <span>{String(timeRemaining.hours).padStart(2, '0')}</span>
            <span>Hours</span>
          </div>
          <div>
            <span>{String(timeRemaining.minutes).padStart(2, '0')}</span>
            <span>Minutes</span>
          </div>
          <div>
            <span>{String(timeRemaining.seconds).padStart(2, '0')}</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>

      <div className="product-slider">
      <button className="scroll-btn left" onClick={handlePrev} disabled={currentIndex >= Math.ceil(products.length / itemsPerPage) - 1}>
                <FaChevronLeft />
        </button>

        <div className="products-container">
          <div className="products" style={{ transform: `translateX(-${currentIndex * (100 / Math.ceil(products.length / itemsPerPage))}%)` }}>
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="wishlist-icon">
                  <FaHeart />
                </div>
                <div className="discount">{`-${product.productDiscount}`}</div>
                <img src={product.imageUrl} alt={product.productName} />
                <h3>{product.productName}</h3>
                <div className="price">
                  <span className="current-price">₹{product.productPrice}</span>
                </div>
                <div className="rating">
                  <span>{'★'.repeat(Math.round(product.rating || 1))}</span>
                  <span>({product.reviews || 1})</span>
                </div>
                <button className="add-to-cart">Add To Cart</button>
              </div>
            ))}
          </div>
        </div>

        <button className="scroll-btn right" onClick={handleNext} disabled={currentIndex >= Math.ceil(products.length / itemsPerPage) - 1}>
          <FaChevronRight />
        </button>
      </div>

      <button className="view-all">View All Products</button>
    </div>
  );
};

export default FlashSales;
