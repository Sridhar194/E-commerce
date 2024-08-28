import React from 'react';
import './home.css';


function WhySell() {
  const features = [
    { title: "Reach crores", description: "Spread Your brand to millions of people all over Nation.", icon: "👥" },
    { title: "Boost Growth", description: "Boost your business growth by connecting to nation wide.", icon: "📈" },
    { title: "Easy Shipping", description: "Get your products reached all over nation with easy shipping policies.", icon: "🚚" },
    { title: "View performance", description: "Spread Your brand to millions of people all over Nation.", icon: "📊" },
    { title: "Get close ratings", description: "Spread Your brand to millions of people all over Nation.", icon: "⭐" },
    { title: "Watch latest earnings", description: "Spread Your brand to millions of people all over Nation.", icon: "💸" },
  ];

  return (
    <div className="why-sell-container">
      <h2>Why Sell on DealDone?</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhySell;
