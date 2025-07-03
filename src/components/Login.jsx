import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "../api/axios.js";
import useAuth from "../hooks/useAuth.jsx";

function Login() {
  const { setAuth } = useAuth();
  const [input, setInput] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/Delegates/Dashboard";

  const to_dashboard = async () => {
    await navigate(from);
  };

  const sendUser = async () => {
    try {
      console.log("sent");
      const response = await axios.post(
        "/login",
        JSON.stringify({ code: input }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log("sent2");
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
        {!success ? <p>{errMsg}</p> : <p>Success</p>}
      </form>
    </div>
  );
}

export default Login;
