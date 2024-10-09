import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaHeart, FaChevronRight } from 'react-icons/fa'; // Import icons
import './Newarrivals.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // To manage the current slide index
  const itemsPerPage = 7; // Number of items to show per page

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch('http://localhost:5000/buyer/newarrivals');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        
        // Check if the fetched data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but received:', data);
          setProducts([]); // Set to empty array to avoid rendering issues
        }
      } catch (error) {
        console.error('Error fetching new arrivals data:', error);
        setProducts([]); // Set to empty array in case of an error
      }
    };

    fetchNewArrivals();
  }, []); // Empty dependency array to run the effect only once on component mount

  // Handle the manual scrolling (next and previous)
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
    <div className="product-slider">
      <button className="scroll-btn left" onClick={handlePrev} disabled={currentIndex === 0}>
        <FaChevronLeft />
      </button>
      <h1>New Arrivals</h1>
      
      <div className="products-container">
        <div className="products">
          {products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((product) => (
            <div className="product-card" key={product._id}>
              <div className="wishlist-icon">
                <FaHeart />
              </div>
              {/* <div className="discount">{`-${product.productDiscount}%`}</div> */}
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
  );
};

export default NewArrivals;
