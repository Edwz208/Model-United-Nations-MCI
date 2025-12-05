import styles from './AdminHome.module.css';
import { Link, Outlet } from 'react-router-dom';

const AdminHome = () => {

  return (
    <div className={styles.container}>
      <div className={styles["white-box"]}>
        <nav className={styles["admin-navbar"]}>
          <Link to="/Admin/Dashboard">Home</Link>
          <Link to="/Admin/Dashboard/resolutions">Resolutions</Link>
          <Link to="/Admin/Dashboard/projection">Projection Dashboard</Link>
          <Link to="/Admin/Dashboard/getCountries">Countries</Link>
        </nav>
          <Outlet />
      </div>
    </div>
    )
}

export default AdminHome