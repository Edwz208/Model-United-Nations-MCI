import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-bar">
      <div
        className="logo-wrapper"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
      >
        <img src="/un_logo.svg" alt="UN logo" className="un-logo" />
        <p className="logo">MMUN</p>
      </div>
      <nav className="nav-links">
        <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
          <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn" onClick={() => navigate("/COC")}>Code of Conduct</button>
          <button className="nav-btn" onClick={() => navigate("/Registration")}>Registration</button>
          <button className="nav-btn" onClick={() => navigate("/Secretariat")}>Secretariat</button>
          <button ref={buttonRef}
            className="nav-btn"
            style={{ fontFamily: "Be Vietnam Pro" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Contact
          </button>
          {showDropdown && (
            <div ref={dialogRef} className="dropdown-dialog">
              <p><strong>Contact Us:</strong></p>
              <p><strong>50 Winterton Drive, Toronto ON M9B 3G7</strong></p>
              <p><strong>martingrovemodelun@gmail.com</strong></p>
              <p><strong>(416) 394-7110</strong></p>
            </div>
          )}
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
