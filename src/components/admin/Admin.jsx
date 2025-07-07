import { useState} from 'react';
import GetAllCountries from './GetAllCountries.jsx';
import './Admin.css';
import {Outlet}  from 'react-router-dom'
import useResData from '../../hooks/useResData.js'
const AdminDash = () => {
  
    const [buttonState, setButton]= useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submitted")
        setButton((prev) => (!prev));
        console.log(!buttonState);
    }
    
    const projectionScreen = () =>{
      window.open('/admin/projection', '_blank').focus();
      return 
    }
    
  return (
    <div className = "background">
      <form onSubmit={handleSubmit}>
          <button>Get Countries</button>
      </form>
      <button onClick={projectionScreen}>Show Projection Screen</button>
      {buttonState ? <GetAllCountries/> : <h1>No countries to display</h1>}
      <Outlet/>
    </div>)
}

export default AdminDash