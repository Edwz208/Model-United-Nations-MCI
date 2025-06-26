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
      <nav className="nav-links">
      <ul>
        <li className="nav-btn">
          <Link to="/" style={{color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li className="nav-btn">
          <Link to="/login" style={{color: 'white', textDecoration: 'none' }}>Login</Link>
        </li>
        <li className="nav-btn">
          <Link to="/FAQ" style={{color: 'white', textDecoration: 'none' }}>FAQ</Link>
        </li>
      </ul>
      <div className="dropdown-wrapper">
        <button className="nav-btn" onClick={handleContactClick}>Contact</button>
          {showDropdown && (
            <div className="dropdown-dialog">
              <p><strong>Contact Us:</strong></p>
              <p><strong>50 Winterton Drive, Toronto ON M9B 3G7</strong></p>
              <p><strong>martingrovemodelun@gmail.com</strong></p>
              <p><strong>(416) 394-7110</strong></p>
            </div>
          )}
        </div>
        {/* <a href="#" className="nav-btn">Home</a>
        <a href="#" className="nav-btn">Team</a>
      
        
        <a href="#" className="nav-btn">Login</a>
        <a href="#" className="nav-btn">Registration</a>
        <a href="#" className="nav-btn">FAQ</a> */}
      </nav>
    </div>
  );
}

export default Navbar;
