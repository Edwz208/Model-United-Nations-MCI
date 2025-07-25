import './Dashboard.css'
import useAuth from '../../hooks/useAuth.js'

function DashboardHome() {
    const {auth} = useAuth()

    return (
        <div className="content">
          <h1 style={{ alignSelf: "center", justifySelf: "center" }}>Welcome, {(auth.country.charAt(0).toUpperCase() + auth.country.slice(1).toLowerCase())}</h1>
          <p>To get started, navigate to the resolutions page to submit an amendment.</p>
          <h3>Useful Links</h3>
          <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <a
            href="/public/downloadable/terms-and-procedures-reference.pdf"
            download="terms-and-procedures.pdf"
          >
            <button
              className="textInput"
            >
              Terms and Procedures
            </button>
          </a>
          <a
            href="/public/downloadable/sample-resolution-ga008.pdf"
            download="sample-resolution-ga008.pdf"
          >
            <button
              className="textInput"
            >
              Example Resolution
            </button>
          </a>
        </div>
        </div>
    );
}

export default DashboardHome