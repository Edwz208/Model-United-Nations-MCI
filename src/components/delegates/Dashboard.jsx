import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'
import useResData from '../../hooks/useResData.js'
import useAuth from '../../hooks/useAuth.js'

function Dashboard() {
  // useResData()
    return (
    <div style={{ backgroundImage: "url('/UN_General_Assembly_hall.jpg')"}} className="background">
      <div className="white-box">
        <nav className="navbar">
          <Link to="/Delegates/Dashboard/home">Home</Link>
          <Link to="/Delegates/Dashboard/resolutions">Resolutions</Link>
          <Link to="/Delegates/Dashboard/overview">Overview</Link>
        </nav>
        <Outlet />
      </div>
    </div>
    );
}

export default Dashboard