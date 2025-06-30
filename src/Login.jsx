import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [input, setInput] = useState("");
  const [click, setClick] = useState(false);

  async function sendUser() {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: input }),
      });
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New post created:", data);
    } catch (error) {
      console.log("Error posting, ", error);
    }
  }
  const navigate = useNavigate();
  const to_dashboard = () => {
    navigate('/Delegates/Dashboard');
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",  height: "100vh", width: "100%", backgroundSize: "cover", backgroundImage: "url('/login_background.jpg')" }}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          sendUser();
        }}
      >
      <input className="login-button"
        type="text"
        name="code"
        value={input}
        aria-label="Enter code here"
        onChange={(e) => setInput(e.target.value)}
        style={{ cursor: "pointer", fontSize: "44px", fontWeight: "bold", marginBottom: "20px", textAlign: "center", backdropFilter: "blur(10px)" }}
      />
      <br />
      <button style={{ textAlign: "center", cursor: "pointer"}} onClick={to_dashboard} className="login-button">Login</button>
    </form>
    </div>
  );
}

export default Login;
