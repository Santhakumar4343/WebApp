import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
<>    <div className="footer">
      <div className="footrow">
      <div className="foot1">
            <Link to="/home" className="footer-logo-link">
             <img src="../assests/li.jpg" alt="Logo" className="footer-logo" />
          </Link>
          <p className="mt-4">HomeMadeWonders - Your Online Store</p>
      </div>
      <div className="foot2">
      <h5 className="font-bold">Explore</h5>
          <ul className="footer-pages-list">
            <li><Link to="/home" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
      </div>
      <div className="foot3">
          <h5 className="font-bold">Follow Us</h5>
          <div className="footer-social-links">
            <ul>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-facebook"></i> Facebook
            </a></li>
            <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-twitter"></i> Twitter
            </a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-instagram"></i> Instagram
            </a></li>
            </ul>
          </div>
       
      </div>
        </div>
  </div>


  <div className="lastfooter">
 <div className="copyright">
  <p>Door No: 16-1-30/A/7 Lokayukta Colony Saidabad Hyderabad India Pincode: 500059 </p>
  <p>MailId: thehomemadewonders@gmail.com</p>
  <p>Copyright © 2023 HomeMadeWonders. All Rights Reserved</p>
 </div>
</div>

  </>



  );
};

export default Footer;

    
          {/* <div className="col-md-3">
            <h5 className="footer-heading">Office Address</h5>
            <p className="footer-text"><i className="fas fa-map-marker-alt"></i> Madhapur, Hyderabad, Telangana 500047</p>
            <p className="footer-text"><i className="fas fa-phone"></i> 040-27059688</p>
            <p className="footer-text"><i className="fas fa-envelope"></i> info@aptits.com</p>
          </div> */}

      
          {/* <div className="col-md-3">
            <h5 className="footer-heading">Business Hours</h5>
            <p className="footer-text">Our support is available 24/7.</p>
            <p className="footer-text">Monday-Friday: 9am to 5pm</p>
            <p className="footer-text">Saturday: 10am to 2pm</p>
            <p className="footer-text">Sunday: Closed</p>
          </div> */}