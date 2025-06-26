import { useState } from 'react'
import './App.css'
import Nav from "./Navbar.jsx"
import Login from "./Login.jsx"
function App() {

  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("https://picsum.photos/1900/1080")',
          backgroundSize: 'contain',
          width: '100%',
          height: '100vh',
        }}
      >
      <Nav />
      </div>
      <div className="overlay" style={{background: 'rgb(47, 47, 47)'}}>
      <Login />
    </div>
    </div>
  );
}

export default App
