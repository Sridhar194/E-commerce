import React from 'react';
import './home.css';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How it works?</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <p>Account creation</p>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Upload products</p>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Get orders & ratings</p>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="step-number">4</div>
          <p>View performance & ratings</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
