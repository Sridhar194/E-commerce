import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiCopyrightLine } from 'react-icons/ri';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  // Simulate fetching the property data asynchronously
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await         fetch('Buyer_Property/propertyfile.json')
        // Specify the correct path
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const data = await response.json();
        setFooterData(data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on component mount

  if (!footerData) {
    return <div>Loading footer...</div>; // Render a loading state while fetching
  }

  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-sections">
            <div className="footer-section">
              <address>
                <h4>{footerData.address.heading}</h4>
                {footerData.address.details.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </address>
            </div>

            <div className="footer-section">
              <h4>{footerData.account.heading}</h4>
              <ul>
                {footerData.account.links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4>{footerData.help.heading}</h4>
              <ul>
                {footerData.help.links.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-social">
              <a href={footerData.social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={15} />
              </a>
              <a href={footerData.social.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={15} />
              </a>
              <a href={footerData.social.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={15} />
              </a>
              <a href={footerData.social.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={15} />
              </a>
            </div>

            <div className="footer-copyright-container">
              <RiCopyrightLine size={10} color="#555" />
              <h6 className="footer-copyright">
                {footerData.copyright}
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
