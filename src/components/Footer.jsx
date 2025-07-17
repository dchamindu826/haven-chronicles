import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Haven Chronicles. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;