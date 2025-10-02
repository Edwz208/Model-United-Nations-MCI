import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import useLogOut from "../hooks/useLogout.js";
import useStore from '../store/store.js'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogged = useStore((state)=>state.isLogged)
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const buttonRef = useRef(null);
  const {logOut: handleLogOut} = useLogOut();
  console.log(isLogged, "islogged from navbar")

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const scrollToTop =(goTo)=>{
    navigate(goTo);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  return (
    <div className="top-bar">
      <div
        className="logo-wrapper"
        onClick={() => scrollToTop()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToTop("/") }
      >
        <img src="/un_logo.svg" alt="UN logo" className="un-logo" />
        <p className="logo">MMUN</p>
      </div>
      <nav className="nav-links">
        <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
          <button className="nav-btn" onClick={() => scrollToTop("/")}>
            Home
          </button>
          {!isLogged ? (
            <button className="nav-btn" onClick={() => scrollToTop("/login") }>
              Login
            </button>
          ) : (
            <button className="nav-btn" onClick={()=>handleLogOut()}>
              Logout
            </button>
          )}
          <button className="nav-btn" onClick={() => scrollToTop("/COC")}>
            Code of Conduct
          </button>
          <button className="nav-btn" onClick={() => scrollToTop("/Registration")}>
            Registration
          </button>
          <button className="nav-btn" onClick={() => scrollToTop("/Secretariat")}>
            Secretariat
          </button>
          <button
            ref={buttonRef}
            className="nav-btn"
            style={{ fontFamily: "Be Vietnam Pro" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Contact
          </button>
          {showDropdown && (
            <div ref={dialogRef} className="dropdown-dialog">
              <p style={{ color: "white", textAlign: "left", fontWeight: "bold"}}><strong>&nbsp;Contact Us:</strong></p>
              <p style={{ color: "white", textAlign: "left" }}><strong>&nbsp;50 Winterton Drive, Toronto ON M9B 3G7</strong></p>
              <p style={{ color: "white", textAlign: "left" }}><strong>&nbsp;martingrovemodelun@gmail.com</strong></p>
              <p style={{ color: "white", textAlign: "left" }}><strong>&nbsp;(416) 394-7110</strong></p>
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
