import { useState} from 'react';
import GetAllCountries from './GetAllCountries.jsx';
import './Admin.css';
import { Link, Outlet } from 'react-router-dom';
const AdminDash = () => {
  
    const [buttonState, setButton]= useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submitted")
        setButton((prev) => (!prev));
        console.log(!buttonState);
    }

  return (
    <div style={{ backgroundImage: "url('/UN_General_Assembly_hall.jpg')"}} className="background">
      <div className="white-box">
        <nav className="navbar">
          <Link to="/Admin/Dashboard/home">Home</Link>
          <Link to="/Admin/Dashboard/projection">Projection Dashboard</Link>
          <Link to="/Admin/Dashboard/getCountries">Get Countries</Link>
        </nav>
        <Outlet />
      </div>
    </div>
    // <div className = "background">
    //   <form onSubmit={handleSubmit}>
    //       <button>Get Countries</button>
    //   </form>
    //   <button onClick={projectionScreen}>Show Projection Screen</button>
    //   {buttonState ? <GetAllCountries/> : <h1>No countries to display</h1>}
    //   <Outlet/>
    // </div>
    )
}

export default AdminDash