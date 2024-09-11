import React from 'react';
import './category.css';

// Import local images
import phonesIcon from '../../../images/smartphone.png';
import computersIcon from '../../../images/monitor.png';
import smartwatchIcon from '../../../images/smartwatch.png';
import cameraIcon from '../../../images/camera.png'; 
import headphonesIcon from '../../../images/headphones.png';
import gamingIcon from '../../../images/gaming.png';

const categories = [
  { id: 1, name: 'Phones', iconUrl: phonesIcon },
  { id: 2, name: 'Computers', iconUrl: computersIcon },
  { id: 3, name: 'SmartWatch', iconUrl: smartwatchIcon },
  { id: 4, name: 'Camera', iconUrl: cameraIcon },
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
