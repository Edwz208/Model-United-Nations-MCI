import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";

function Login() {
  const { setAuth } = useAuth();
  const [input, setInput] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/Delegates/Dashboard";

  useEffect(() => {
  if (errMsg) {
    const timer = setTimeout(() => {
      setErrMsg("");
    }, 3000); // removes the error message after 3 seconds
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
        JSON.stringify({ code: input }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      setInput("");
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      const country = response?.data?.country;
      setAuth({ country, role, accessToken });
      to_dashboard();
      setSuccess((prev) => !prev);
      setErrMsg("");
    } catch (err) {
      console.log("Login error:", err);

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials");
      } else {
        setErrMsg("Login Failed");
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      setTimeout(() => setErrMsg(""), 3000);

      setSuccess(false);
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
          name="code"
          value={input}
          aria-label="Enter code here"
          onChange={(e) => setInput(e.target.value)}
          style={{
            cursor: "pointer",
            fontSize: "44px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        />
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
