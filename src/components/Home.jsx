import Slideshow from "./Slideshow.jsx";
import FAQ from "./FAQ.jsx";
import "./Home.css";
function Home() {
  return (
    <div>
      <div className="image-container">
        <img
          src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg"
          alt="1"
          style={{ width: "100%" }}
        />
        <div
          className="overlay"
          style={{
            fontSize: "50px",
            fontWeight: "900",
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
          }}
        >
          <div className="overlay-text">
            <h1
              style={{
                fontSize: "75px",
                fontWeight: "900",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Martingrove Model UN
            </h1>
            <h3 style={{ fontSize: "30px", fontWeight: "700" }}>Since 1986</h3>
          </div>
        </div>
      </div>
      <div className="overlay" style={{ background: "#282832" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "250",
              marginTop: "20px",
              marginBottom: "20px",
              width: "50%",
              color: "white",
            }}
          >
            For forty years, the Martingrove Model UN (MMUN) conference has
            offered thousands of students — both from its home at Martingrove
            Collegiate Institute and across the GTA — a stimulating and exciting
            simulation that emulates the atmosphere of a real-world United
            Nations Conference. Students assume the roles of delegates for their
            given countries, engaging in debates on a variety of topics that
            reflect current, pressing global issues, and are counted on to
            progress these debates forward over the duration of the conference.
            If you have any questions regarding the nature or procedures of
            MMUN, please visit the <strong>FAQ page</strong> or email us at{" "}
            <strong>martingrovemodelun@gmail.com.</strong>{" "}
          </div>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "400",
            marginTop: "80px",
            textAlign: "center",
          }}
        >
          Delegate Resources
        </h1>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            marginBottom: "80px",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <a
            href="/public/downloadable/terms-and-procedures-reference.pdf"
            download="terms-and-procedures.pdf"
          >
            <button
              style={{ backgroundColor: "#04a5e5" }}
              className="shortcut-to-login"
            >
              Terms and Procedures
            </button>
          </a>
          <button
            style={{ backgroundColor: "#40ae49" }}
            className="shortcut-to-login"
            onClick={() => (window.location.href = "/Login")}
          >
            Delegate Portal
          </button>
          <a
            href="/public/downloadable/sample-resolution-ga008.pdf"
            download="sample-resolution-ga008.pdf"
          >
            <button
              style={{ backgroundColor: "#ea1d2d" }}
              className="shortcut-to-login"
            >
              Example Resolution
            </button>
          </a>
        </div>
        <div>
          <Slideshow />
        </div>
        <div style={{ marginBottom: "40px"}}>
          <FAQ />
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
        <footer>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ gap: "1rem", display: "flex", flexDirection: "row", alignSelf: "center", justifySelf: "start"}}>
              <a href="mailto:martingrovemodelun@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope" style={{ color: "#04a5e5", fontSize: "1.5rem" }}></i>
              </a>
              <a href="https://github.com/Edwz208/Model-United-Nations-MCI" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github" style={{ color: "#04a5e5", fontSize: "1.5rem" }}></i>
              </a>
              <a href="https://www.instagram.com/mcimun/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram" style={{ color: "#04a5e5", fontSize: "1.5rem" }}></i>
              </a>
            </div>
            <div style={{ display: "block", width: "100%", textAlign: "center", alignSelf: "center", justifySelf: "center"}}>
              <p style={{ color: "white" }}>
                Made by &nbsp;
                <strong><a href="https://github.com/Edwz208" target="_blank" rel="noopener noreferrer">Edwin Zeng</a></strong> 
                &nbsp; and &nbsp;
                <strong><a href="https://github.com/SwordPuffin" target="_blank" rel="noopener noreferrer">Nathan Perlman</a></strong>
              </p>
              <strong>© 2025 Martingrove Model UN</strong>
            </div>
            <div>
              <div
                  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  onClick={() => navigate("/")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate("/")}
                >
                <img src="/un_logo.svg" alt="UN logo" className="un-logo" />
                <p className="logo">MMUN</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
