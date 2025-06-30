import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css'
import Nav from "./Navbar.jsx"
import Login from "./Login.jsx"
import FAQ from './FAQ.jsx';
import Home from './Home.jsx';
import Registration from './Registration.jsx';
import Secretariat from "./Secretariat.jsx";
import PageWrapper from './PageWrapper.jsx';
import Dashboard from './Delagates/Dashboard.jsx';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/FAQ" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/Registration" element={<PageWrapper><Registration /></PageWrapper>} />
        <Route path="/Secretariat" element={<PageWrapper><Secretariat /></PageWrapper>} />
        <Route path="/Delagates/Dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={{ background: '#282832' }}>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
        </style>
        <Nav />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
