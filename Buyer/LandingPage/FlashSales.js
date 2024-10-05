import React, { useState, useEffect } from 'react';
import './FlashSales.css';
import { FaHeart } from 'react-icons/fa';

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const itemsPerPage = 4; // Number of products to show per slide

  useEffect(() => {
    // Replace the URL with your actual backend endpoint
    fetch('https://your-backend-api.com/api/flash-sales')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));

    const countdownInterval = setInterval(() => {
      setTimeRemaining(prevTime => {
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

  return (
    <div className="flash-sales">
      <div className="header">
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
        
        <div className="products">
          {products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((product) => (
            <div className="product-card" key={product.id}>
              <div className="wishlist-icon">
                <FaHeart />
              </div>
              <div className="discount">{`-${product.discount}%`}</div>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <div className="price">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>
              <div className="rating">
                <span>{'★'.repeat(Math.round(product.rating))}</span>
                <span>({product.reviews})</span>
              </div>
              <button className="add-to-cart">Add To Cart</button>
            </div>
          ))}
        
      </div>
      
      <button className="view-all">View All Products</button>
    </div>
  );
};

export default FlashSales;
