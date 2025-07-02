import { useState} from 'react';
import { Link } from 'react-router-dom'; 
import GetAllCountries from './GetAllCountries.jsx';
import './Admin.css';
const AdminDash = () => {
    const [buttonState, setButton]= useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submitted")
        setButton((prev) => (!prev));
        console.log(!buttonState);
    }
  return (<div className = "background">
  
    <form onSubmit={handleSubmit}>
        <button>Get Countries</button>
    </form>
    {buttonState ? <GetAllCountries/> : <h1>No countries to display</h1>}
  </div>)
}

export default AdminDash