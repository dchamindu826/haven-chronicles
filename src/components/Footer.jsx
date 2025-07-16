// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './Footer.css';

function Footer() {
  // මෙතන # තියෙන තැන් වලට ඔයාගේ ඇත්ත social media page වල links දාන්න
  const socialLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  };

  return (
    <footer className="site-footer">
      <div className="social-links">
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
      <p className="footer-copyright">&copy; {new Date().getFullYear()} Haven Chronicles. All rights reserved.</p>
    </footer>
  );
}

export default Footer;