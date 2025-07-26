import React from 'react'

import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
    const scrollToTop =()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  return (
    
        <footer className={styles.footer}>
            <div className={styles.flexFooter}>
            <div className={styles.socialIcons}>
              <a href="mailto:martingrovemodelun@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://github.com/Edwz208/Model-United-Nations-MCI" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com/mcimun/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className={styles.madeBy}>
              <p style={{ color: "white" }}>
                Made by &nbsp;
                <strong><a href="https://github.com/Edwz208" target="_blank" rel="noopener noreferrer">Edwin Zeng</a></strong> 
                &nbsp; and &nbsp;
                <strong><a href="https://github.com/SwordPuffin" target="_blank" rel="noopener noreferrer">Nathan Perlman</a></strong>
              </p>
              <strong>© 2025 Martingrove Model UN</strong>
            </div>
            <Link to="/" className={styles.footerLogo} onClick={scrollToTop}>
                <img src="/un_logo.svg" alt="UN logo"/>
                <p>MMUN</p>
            </Link>
            </div>
        </footer>
          )
}

export default Footer