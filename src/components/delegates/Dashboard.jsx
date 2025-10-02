import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'

function Dashboard() {
    return (
    <div style={{ backgroundImage: "url('/UN_General_Assembly_hall.jpg')"}} className="background">
      <div className="white-box">
        <nav className="navbar">
          <Link to="/Delegates/Dashboard/home">Home</Link>
          <Link to="/Delegates/Dashboard/resolutions">Resolutions</Link>
          <Link to="/Delegates/Dashboard/overview">Overview</Link>
        </nav>
        <div style={{overflow: "scroll"}}>
          <Outlet />
        </div>
      </div>
    </div>
    );
}

export default Dashboard