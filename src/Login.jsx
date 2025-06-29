import { useState } from "react";
import "./Login.css";

function Login() {
  const [input, setInput] = useState("");

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
        setInput("");
      }
      console.log(response.status);
      const data = await response.json();
      if (response.status === 202) {
        console.log("Logged in", data);
      }
    } catch (error) {
      console.log("Error logging in, ", error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(JSON.stringify({ code: input }));
        sendUser();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
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
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "20px",
          width: "20%",
        }}
      />
      <br />
      <button className="login-button">Login</button>
    </form>
  );
}

export default Login;
