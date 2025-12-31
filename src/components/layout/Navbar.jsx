import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import useLogOut from "../../hooks/useLogout.js";
import useStore from "../../contexts/store.js";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useLogOut();
  const isLogged = useStore((s) => s.isLogged);
  const country = useStore((s) => s.country);
  console.log(isLogged)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const contactRef = useRef(null);
  const contactBtnRef = useRef(null);

  const goTo = useCallback(
    (path) => {
      navigate(path);
      setIsMenuOpen(false);
      setIsContactOpen(false);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    },
    [navigate]
  );

  useEffect(() => {
    setIsMenuOpen(false);
    setIsContactOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isContactOpen) return;

    const handleClickOutside = (e) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(e.target) &&
        contactBtnRef.current &&
        !contactBtnRef.current.contains(e.target)
      ) {
        setIsContactOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isContactOpen]);

  if (location.pathname.startsWith('/Admin') || location.pathname.startsWith('/Delegates')) {
    return (
      <header className="fixed py-1 top-0 flex items-center justify-between px-6 z-10 inset-x-0 bg-primary mb-25">
      <div
        className={styles["logo-wrapper"]}
        role="button"
        tabIndex={0}
        onClick={() => goTo("/")}
        onKeyDown={(e) => e.key === "Enter" && goTo("/")}
      >
        <img src="/un_logo.svg" alt="UN logo" className={styles["un-logo"]} />
        <span className={styles.logo}>MMUN</span>
      </div>
      <img src="/40.png" alt="MMUN40 Logo" className="w-12 h-12" />
      <h1 className={styles["nav-btn"]}>{country}</h1>
      </header>
    )
  }
  return (
    <header className="fixed top-0 flex items-center justify-between px-6 py-1 z-10 inset-x-0 bg-primary mb-25">
      
      <div
        className={styles["logo-wrapper"]}
        role="button"
        tabIndex={0}
        onClick={() => goTo("/")}
        onKeyDown={(e) => e.key === "Enter" && goTo("/")}
      >
        <img src="/un_logo.svg" alt="UN logo" className={styles["un-logo"]} />
        <span className={styles.logo}>MMUN</span>
      </div>

      <nav className={styles["nav-links"]}>
        <div
          className={`${styles["navbar-buttons"]} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          <button className={styles["nav-btn"]} onClick={() => goTo("/")}>
            Home
          </button>

          <button className={styles["nav-btn"]} onClick={() => goTo("/COC")}>
            Code of Conduct
          </button>
          <button className={styles["nav-btn"]} onClick={() => goTo("/FAQ")}>
            FAQ
          </button>
          <button className={styles["nav-btn"]} onClick={() => goTo("/Secretariat")}>
            Secretariat
          </button>

          <button
            ref={contactBtnRef}
            className={`${styles["nav-btn"]} ${
              isContactOpen ? styles.active : ""
            }`}
            onClick={() => setIsContactOpen((v) => !v)}
          >
            Contact
          </button>

          {isContactOpen && (
            <div ref={contactRef} className={styles["dropdown-dialog"]}>
              <p><strong>Contact Us</strong></p>
              <p>50 Winterton Drive, Toronto ON M9B 3G7</p>
              <p>martingrovemodelun@gmail.com</p>
              <p>(416) 394-7110</p>
            </div>
          )}
        </div>
        {!isLogged ? (
        <button className={`${styles["nav-btn"]} ${styles["pad-char"]}`} onClick={() => goTo("/login")}>
          Login
        </button>
      ) : (
        <button
          className={styles["nav-btn"]}
          onClick={() => {
            logOut();
            goTo("/");
          }}
        >
          Logout
        </button>
      )}
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
