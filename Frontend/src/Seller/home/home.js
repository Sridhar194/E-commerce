import React from "react";
import Header from "./Header";  
import Footer from "../../Seller/component/Footer";
import Sell from '../assets/images/Sell.png';
import './home.css';
import Sellingbtn from "./Sellingbtn";
import WhySell from "./Whysell";
import HowItWorks from "./Howitwork";

function Home() {
  console.log("hey");  

  return (
    <div>
      <Header />
      <div className="Sellercontent">
              <div className="Sellerleft-section">
                <h1 className="Sellerleft-heading">Grow Your business online on Deal Done and become an identified Seller</h1>
              </div>
              <div className="Sellerright-section">
              <img src={Sell} alt="Sell" />
              </div>
      </div>
      <Sellingbtn/>
      <WhySell/>
      <HowItWorks/>
      <Footer/>
    </div>
  );
}

export default Home;
