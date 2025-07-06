import './Dashboard.css'
import useAuth from '../../hooks/useAuth.js'

function DashboardHome() {
    const {auth} = useAuth()

    return (
        <div className="content">
          <h2 style={{ alignSelf: "center", justifySelf: "center" }}>Welcome {(auth.country.charAt(0).toUpperCase() + auth.country.slice(1).toLowerCase())}</h2>
          <p>To get started, navigate to the resolutions page to submit an amendment.</p>
        </div>
    );
}

export default DashboardHome