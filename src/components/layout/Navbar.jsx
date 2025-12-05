import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useLogOut from "../../hooks/useLogout.js";
import useStore from '../../contexts/store.js';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogged = useStore((state) => state.isLogged);
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const buttonRef = useRef(null);
  const { logOut: handleLogOut } = useLogOut();
  console.log(isLogged, "isLogged from navbar");

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

  const scrollToTop = (goTo = "/") => {
    navigate(goTo);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className={styles["top-bar"]}>
      <div
        className={styles["logo-wrapper"]}
        onClick={() => scrollToTop()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToTop("/")}
      >
        <img src="/un_logo.svg" alt="UN logo" className={styles["un-logo"]} />
        <p className={styles.logo}>MMUN</p>
      </div>

      <nav className={styles["nav-links"]}>
        <div className={`${styles["navbar-buttons"]} ${menuOpen ? styles.navbar-buttonsOpen : ""}`}>
          <button className={styles["nav-btn"]} onClick={() => scrollToTop("/")}>
            Home
          </button>

          {!isLogged ? (
            <button className={styles["nav-btn"]} onClick={() => scrollToTop("/login")}>
              Login
            </button>
          ) : (
            <button className={styles["nav-btn"]} onClick={() => handleLogOut()}>
              Logout
            </button>
          )}

          <button className={styles["nav-btn"]} onClick={() => scrollToTop("/COC")}>
            Code of Conduct
          </button>
          <button className={styles["nav-btn"]} onClick={() => scrollToTop("/Registration")}>
            Registration
          </button>
          <button className={styles["nav-btn"]} onClick={() => scrollToTop("/Secretariat")}>
            Secretariat
          </button>

          <button
            ref={buttonRef}
            className={styles["nav-btn"]}
            style={{ fontFamily: "Be Vietnam Pro" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Contact
          </button>

          {showDropdown && (
            <div ref={dialogRef} className={styles["dropdown-dialog"]}>
              <p style={{ color: "white", textAlign: "left", fontWeight: "bold" }}>
                &nbsp;Contact Us:
              </p>
              <p style={{ color: "white", textAlign: "left" }}>
                &nbsp;50 Winterton Drive, Toronto ON M9B 3G7
              </p>
              <p style={{ color: "white", textAlign: "left" }}>
                &nbsp;martingrovemodelun@gmail.com
              </p>
              <p style={{ color: "white", textAlign: "left" }}>
                &nbsp;(416) 394-7110
              </p>
            </div>
          )}
        </div>

        <button
          className={styles.hamburger}
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
