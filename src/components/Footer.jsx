import React from 'react';
// නිවැරදි ක්‍රමය (The fix)
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer-main">
      <div className="social-links-footer">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
      <p className="footer-copyright-main">
        &copy; {new Date().getFullYear()} Haven Chronicles. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;