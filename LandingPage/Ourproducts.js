import React from 'react';
import './Bestselling.css';

const products = [
    {
        id: 1,
        image: 'path/to/north-coat.jpg',
        name: 'The north coat',
        price: '$260',
        originalPrice: '$360',
        rating: 4.5,
        reviews: 65,
    },
    {
        id: 2,
        image: 'path/to/gucci-bag.jpg',
        name: 'Gucci duffle bag',
        price: '$960',
        originalPrice: '$1160',
        rating: 4.5,
        reviews: 65,
    },
    {
        id: 3,
        image: 'path/to/cpu-cooler.jpg',
        name: 'RGB liquid CPU Cooler',
        price: '$160',
        originalPrice: '$170',
        rating: 4.5,
        reviews: 65,
    },
    {
        id: 4,
        image: 'path/to/bookshelf.jpg',
        name: 'Small BookShelf',
        price: '$360',
        originalPrice: '',
        rating: 4.5,
        reviews: 65,
    }
];

const BestSellingProducts = () => {
    return (
        <div className="best-selling-products">
            <div className="header">
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
