import { useState } from 'react'
import './App.css'
import Nav from "./Navbar.jsx"
import Login from "./Login.jsx"
import FAQ from './FAQ.jsx';
import Home from './Home.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <Router>
      <div className="App" style={{background: '#313244', margin: "0", padding: "0"}}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
