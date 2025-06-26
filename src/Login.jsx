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
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ fontSize: "50px", fontWeight: "900", marginTop: "20px", marginBottom: "20px", width: "100%", textAlign: "center", fontFamily: "jetbrains mono", color: "white"}}>
        MMUN
      </div>
      <div style={{ fontSize: "18px", color: "white", fontWeight: "normal", marginBottom: "20px", width: "50%", textAlign: "center", fontFamily: "jetbrains mono" }}>
For over thirty years, the Martingrove Model UN (MMUN) conference has offered thousands of students — both from its home at Martingrove Collegiate Institute and across the GTA — a stimulating and exciting simulation that emulates the atmosphere of a real-world United Nations Conference. Students assume the roles of delegates for their given countries, engaging in debates on a variety of topics that reflect current, pressing global issues, and are counted on to progress these debates forward over the duration of the conference. If you have any questions regarding the nature or procedures of MMUN, please visit the FAQ page or email us at martingrovemodelun@gmail.com.      </div>
      <input
        type="text"
        name="code"
        value={input}
        aria-label="Enter code here"
        onChange={(e) => setInput(e.target.value)}
        style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px", width: "10%",  textAlign: "center",
          borderRadius: "10px", alignSelf: "center", backgroundColor: "white", color: "black", minWidth: "300px",
          fontFamily: "jetbrains mono", border: "none"
         }}
      />
      <br />
      <button
      style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", width: "10%", textAlign: "center", 
        borderRadius: "10px", backgroundColor: "rgb(255, 255, 255)  ", color: "black", fontFamily: "jetbrains mono",
        border: "none"
      }}
      >Login</button>
    </form>
  );
}

export default Login;
