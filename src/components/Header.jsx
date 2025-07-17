import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header-main">
      <div className="site-header-content">
        <Link to="/" className="site-title-link">
          <h1 className="site-title-main">HAVEN CHRONICLES</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;