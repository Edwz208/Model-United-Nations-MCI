import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../../contexts/store.js"
import LoginForm from "../../components/items/LoginForm.jsx"
import { to_from, to_dashboard, to_admin_dashboard } from "../../utils/helpers.js"
import { useLogin } from "../../hooks/useLogin.js"

function Login() {
  
  const setAccessToken = useStore((state)=>state.setAccessToken)
  const setRole = useStore((state)=>state.setRole)
  const setCountry = useStore((state)=>state.setCountry)
  const isLogged = useStore((state)=>state.isLogged)
  const setLogged = useStore((state)=>state.setLogged)
  const setID = useStore((state)=>state.setID)
  const loggedFromThisPage = useRef(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname

  useEffect(() => {
    if (!loggedFromThisPage.current){
      if (isLogged){
        setLogged(true);
        navigate('/', {replace: true})
      }
    }

  }, [isLogged])

  const [code, setCode] = useState('')
  const [countryName, setCountryName] = useState('')

  const onSuccessCallback = (data) => {
    loggedFromThisPage.current = true
    setLogged(true)
    localStorage.setItem("Logged", "true")
    setAccessToken(data?.accessToken)
    setRole(data?.role)
    setCountry(data?.name)
    setID(data?.country_id)
    setErrorSubmit('')
    const role = data?.role
    if (from && from !== '/Delegates/Dashboard' && from !== '/Admin/Dashboard'){
      to_from(navigate, from)
    }
    else if (role === 'admin'){
      to_admin_dashboard(navigate)
    }
    else if (role === 'member'){
      to_dashboard(navigate)
    }
  }

  const onErrorCallback = (error) => {
    if (!error?.response) {
      setErrorSubmit("No Server Response");
    }
    else if (error?.response?.status === 404) {
      setErrorSubmit("Invalid Credentials")
    }
    else {
      setErrorSubmit(error.response?.data?.detail || "Login Failed")
    }
  }

  const {mutate} = useLogin(onSuccessCallback, onErrorCallback)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutate({ code, country: countryName })
    
  }
  return (<>
  <LoginForm code={code} country={countryName} setCountry={setCountryName} setCode={setCode} handleSubmit={handleSubmit} errorSubmit={errorSubmit}/>
  </>
  )
}

export default Login;
