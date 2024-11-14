import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';

function Footer() {
    const[footerAddress,setfooterAddress]=useState([]);
    const[footerAccount,setfooterAccount]=useState([]);
    const[footerHelp,setfooterHelp]=useState([]);
    const[footerCopyright,setfooterCopyright]=useState([]);

    useEffect(() => {
      // Fetch the JSON file from the public folder
      fetch('/locals/propertyFile.json')
        .then(response => response.json())
        .then(data => {
          // Update the state with navbar items from the JSON
          setfooterAddress(data.footerAddress);
          setfooterAccount(data.footerAccount);
          setfooterHelp(data.footerHelp);
          setfooterCopyright(data.footerCopyright);
        })
        .catch(error => console.error('Error fetching navbar items:', error));
    }, []);

  return (
    <footer>
      <div className="seller-footer-container">
                <div className="seller-footer-sections">
                    <div className="seller-footer-section">
                        <h4>{footerAddress[0]?.label}</h4>
                        <p>{footerAddress[0]?.url}</p>
                    </div>
                    <div className="seller-footer-section">
                        <h4>{footerAccount[0]?.label}</h4>
                        <ul>
                            {footerAccount.slice(1).map((item, index) => (
                                <li key={index}>
                                    <Link to={item.url}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="seller-footer-section">
                        <h4>{footerHelp[0]?.label}</h4>
                        <ul>
                            {footerHelp.slice(1).map((item, index) => (
                                <li key={index}>
                                    <Link to={item.url}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        <div className="seller-footer-bottom">
          <div className="seller-footer-social">
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={15} />
            </Link>
            <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={15} />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={15} />
            </Link>
            <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={15} />
            </Link>
          </div>
          <div className="seller-footer-copyright-container">
            <RiCopyrightLine className='seller-RiCopyrightLine' />
            <h6 className="seller-footer-copyright">
              {footerCopyright}
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
