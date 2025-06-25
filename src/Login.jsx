import { useState } from "react";

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendUser();
      }}
    >
      <input
        type="text"
        name="code"
        value={input}
        aria-label="Enter code here"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <br />
      <button>Login</button>
    </form>
  );
}

export default Login;
