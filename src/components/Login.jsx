import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../api/axios.js";
import useStore from "../store/store.js"
import { useMutation, useQueryClient } from '@tanstack/react-query'


function Login() {
  // setting up zustand
  const setAccessToken =useStore((state)=>state.setAccessToken)
  const setRoles = useStore((state)=>state.setRoles)
  const setCountry = useStore((state)=>state.setCountry)
  const isLogged = useStore((state)=>state.isLogged)
  const setLogged = useStore((state)=>state.setLogged)
  const setID = useStore((state)=>state.setID)


  // setting up form states
  const loggedFromThisPage = useRef(false)
  const [code, setCode] = useState("");
  const [countryVal, setcountryVal] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const postLogin = async () =>{
  const response = await axios.post(
  "/login",
  JSON.stringify({ code, country: countryVal }),
  {
    headers: { "Content-type": "application/json" },
    withCredentials: true,
  }
);
  return response?.data;
}

  // setting up tanstack
  const queryClient = useQueryClient()
  const mutation = useMutation({ 
    mutationFn: postLogin, 
    onSuccess: (data)=>{  // mutations dont auto trigger, queries do 
    queryClient.setQueryData(['ownAmendments'], data?.ownAmendments)
    queryClient.setQueryData(['recentAmendments'], data?.recentAmendments)
    }
  })
  

  const navigate = useNavigate();
  const from = location.state?.from?.pathname

  const to_from = () => {
    navigate(from, {replace: true});
  };
  const to_dashboard = () =>{
    console.log("Delegate dashboard")
    navigate("/Delegates/Dashboard", {replace: true})
  }
  const to_admin_dashboard = () =>{
    navigate("/Admin/Dashboard", {replace: true });
  }

  useEffect(() => {
    if (!loggedFromThisPage.current){
      console.log(isLogged)
      console.log("from login", localStorage.getItem("Logged"))
      if (isLogged){
        console.log("triggering")
        setLogged(true);
        navigate('/', {replace: true})
      }
    }

  }, [isLogged]);


  useEffect(()=>{
    if (errMsg) {
      const timer = setTimeout(() => {
      setErrMsg("");
    }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [errMsg])

  const sendUser = async () => {
    try { // onError instead of trycatch only for regular mutate()
      const returned = await mutation.mutateAsync() // holds return of mutationFn
      setCode("");
      setcountryVal("");
      setErrMsg("");

      // sending to zustand the data
      console.log(returned)
      setAccessToken(returned?.accessToken)
      setRoles(returned?.roles)
      setCountry(returned?.country)
      loggedFromThisPage.current = true // ✅ The re-render happens after the immediate parent function (sendUser) finishes execution or yields.
      setID(returned?.id) 
      setLogged(true)
      localStorage.setItem("Logged", true)
      if (!from == '/Delegates/Dashboard'){
        to_from()
      }
      const role = returned?.role
      if (role == 'admin'){
        to_admin_dashboard();
      }
      else if (role == 'member'){
        to_dashboard();
      }
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
          value={countryVal}
          placeholder="country: e.g. 'canada'"
          aria-label="Enter country here"
          onChange={(e) => setcountryVal(e.target.value)}
          style={{
            cursor: "pointer",
            fontSize: "38px",
            backdropFilter: "blur(10px)"
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
            fontSize: "38px",
            marginBottom: "20px",
            backdropFilter: "blur(10px)"
          }}
        />
        <div style={{width: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
          <h3 style={{ textAlign: "center", color: "white", fontSize: "medium", backgroundColor: "#414559", padding: "10px", borderRadius: "14px"}}>(See tech desk if you forgot your access code)</h3>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{ textAlign: "center", cursor: "pointer", color:"lightBlue"}}
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
