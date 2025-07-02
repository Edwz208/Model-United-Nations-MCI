import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleContactClick = () => {
    const timeClicked = new Date().toLocaleTimeString();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="top-bar">
      <div className="logo-wrapper">
        <img src='/un_logo.svg' alt='un logo' className="un-logo" />
        <p className="logo">MMUN</p>
      </div>
      <nav className="nav-links">
      <ul>
        <li className="nav-btn">
          <Link to="/" style={{color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li className="nav-btn">
          <Link to="/login" style={{color: 'white', textDecoration: 'none' }}>Login</Link>
        </li>
        <li className="nav-btn">
          <Link to="/COC(K)" style={{color: 'white', textDecoration: 'none' }}>Code of Conduct</Link>
        </li>
        <li className="nav-btn">
          <Link to="/Registration" style={{color: 'white', textDecoration: 'none' }}>Registration</Link>
        </li>
        <li className="nav-btn">
          <Link to="/Secretariat" style={{color: 'white', textDecoration: 'none' }}>Secretariat</Link>
        </li>
      </ul>
      <div className="dropdown-wrapper">
        <button className="nav-btn" style={{ fontFamily: "Be Vietnam Pro"}}onClick={handleContactClick}>Contact</button>
          {showDropdown && (
            <div className="dropdown-dialog">
              <p><strong>Contact Us:</strong></p>
              <p><strong>50 Winterton Drive, Toronto ON M9B 3G7</strong></p>
              <p><strong>martingrovemodelun@gmail.com</strong></p>
              <p><strong>(416) 394-7110</strong></p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
