import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";

function Login() {
  const { auth, setAuth } = useAuth();
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/Delegates/Dashboard";
  useEffect(() => {
  if (errMsg) {
    const timer = setTimeout(() => {
      setErrMsg("");
    }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [errMsg]);

  const to_dashboard = async () => {
    await navigate(from);
  };

  const sendUser = async () => {
    try {
      console.log("Sending request to:", axios.defaults.baseURL + "/login");
      const response = await axios.post(
        "/login",
        JSON.stringify({ code, country }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      setCode("");
      setCountry("");
      setErrMsg("");
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.role;
      setAuth({ country, roles, accessToken });
      to_dashboard();
    } catch (err) {
      console.log("Login error:", err);

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        console.log(err.response?.data?.detail)
        setErrMsg(err.response?.data?.detail);
      } else {
        setErrMsg("Login Failed");
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      setTimeout(() => setErrMsg(""), 3000);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: "url('/login_background.jpg')",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendUser();
        }}
      >
        <div style={{ position: "relative", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          {errMsg && (
            <div className={`error-dialog ${showError ? "show" : "fade-out"}`}>
              {errMsg}
            </div>
          )}
        </div>
        <input
          className="login-button"
          type="text"
          name="country"
          value={country}
          placeholder="Country: e.g. 'canada'"
          aria-label="Enter country here"
          onChange={(e) => setCountry(e.target.value)}
          style={{
            cursor: "pointer",
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            backdropFilter: "blur(10px)",
          }}
        />
        <br />
        <input
          className="login-button"
          type="text"
          name="code"
          value={code}
          placeholder="Access Code: e.g. '123abc'"
          aria-label="Enter code here"
          onChange={(e) => setCode(e.target.value)}
          style={{
            cursor: "pointer",
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            backdropFilter: "blur(10px)",
          }}
        />
        <div style={{width: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
          <h3 style={{ textAlign: "center", color: "white", backgroundColor: "#e01b24", padding: "10px", borderRadius: "14px"}}>(See tech desk if you forgot your access code)</h3>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{ textAlign: "center", cursor: "pointer" }}
            className="login-button"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;