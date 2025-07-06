import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'
import useResData from '../../hooks/useResData.js'
import useAuth from '../../hooks/useAuth.js'

function Dashboard() {
  const {auth} = useAuth()
  // useResData()
    return (
    <div style={{ backgroundImage: "url('/UN_General_Assembly_hall.jpg')" }} className="background">
      <div className="white-box">
        <nav className="navbar">
          <Link to="/Delegates/Dashboard">Home</Link>
          <Link to="/Delegates/Dashboard/resolutions">Resolutions</Link>
          <Link to="/Delegates/Dashboard/overview">Overview</Link>
        </nav>
        <div className="content">
          <h2 style={{ alignSelf: "center", justifySelf: "center" }}>Welcome, {auth.country}</h2>
          <p>To get started, navigate to Country Overview to submit an amendment.</p>
        </div>
        <Outlet />
      </div>
    </div>
    );
}

export default Dashboard