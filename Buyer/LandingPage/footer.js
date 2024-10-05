import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch the property file
    fetch('Buyer_property/propertyfile.json')
      .then(response => response.json())
      .then(data => setFooterData(data.footer))
      .catch(error => console.error('Error fetching property file:', error));
  }, []);

  if (!footerData) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-sections">
            <div className="footer-section">
              <h4>{footerData.address.title}</h4>
              {footerData.address.details.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            <div className="footer-section">
              <h4>{footerData.account.title}</h4>
              <ul>
                {footerData.account.links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>{footerData.help.title}</h4>
              <ul>
                {footerData.help.links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-social">
              <a href={footerData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={15} />
              </a>
              <a href={footerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={15} />
              </a>
              <a href={footerData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={15} />
              </a>
              <a href={footerData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={15} />
              </a>
            </div>
            <div className="footer-copyright-container">
              <RiCopyrightLine size={10} color="#555" />
              <h6 className="footer-copyright">
                {footerData.copyright.text}
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
