import React, { useEffect, useState } from 'react';
import './Bestselling.css';

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/buyer/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

  

    return (
        <div className="best-selling-products">
            <div className="Bestsellingheader">
                <h1>Best Selling Products</h1>
                <button className="view-all-btn">View All</button>
            </div>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="price">
                                <span className="current-price">{product.price}</span>
                                {product.originalPrice && (
                                    <span className="original-price">{product.originalPrice}</span>
                                )}
                            </div>
                            <div className="rating">
                                <span className="stars">⭐ {product.rating}</span>
                                <span className="reviews">({product.reviews})</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="wishlist-btn">❤️</button>
                         <button className="view-btn">👁️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellingProducts;
 