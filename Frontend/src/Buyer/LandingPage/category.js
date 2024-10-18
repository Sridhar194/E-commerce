import React from 'react';
import './category.css';

// Import local images
import phonesIcon from '../Assets/images/smartphone.png';
import shoeIcon from '../Assets/images/shoe.png';
import chefIcon from '../Assets/images/chef.png';
import fashionIcon from '../Assets/images/fashion.png'; 
import headphonesIcon from '../Assets/images/headphones.png';
import gamingIcon from '../Assets/images/gaming.png';

const categories = [
  { id: 1, name: 'Phones', iconUrl: phonesIcon },
  { id: 2, name: 'Shoes', iconUrl: shoeIcon },
  { id: 3, name: 'Kitchen', iconUrl: chefIcon },
  { id: 4, name: 'Fashion', iconUrl: fashionIcon },
  { id: 5, name: 'Headphones', iconUrl: headphonesIcon },
  { id: 6, name: 'Gaming', iconUrl: gamingIcon },
];

const BrowseByCategory = () => {
  return (
    <div className="browse-by-category">
      <h2>Browse by Category</h2>
      <div className="categories">
        {categories.map(category => (
          <div className="category-card" key={category.id}>
            <img src={category.iconUrl} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
