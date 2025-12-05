import { Link, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css'

function DelegatesHome() {
    return (
    <div className={styles.background}>
      <div className={styles["white-box"]}>
        <nav className={styles["navbar"]}>
          <Link to="/Delegates/Dashboard">Home</Link>
          <Link to="/Delegates/Dashboard/resolutions">Resolutions</Link>
          <Link to="/Delegates/Dashboard/amendments">Amendments</Link>
          <Link to="/Delegates/Dashboard/overview">Overview</Link>

        </nav>
        <div style={{overflow: "scroll"}}>
          <Outlet />
        </div>
      </div>
    </div>
    );
}

export default DelegatesHome;