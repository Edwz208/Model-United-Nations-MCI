import useAuth from '../hooks/useAuth.js'
import {useEffect} from 'react'
import {Navigate, useLocation, Outlet } from 'react-router-dom'

const LoginWrapper = () => {
    const { auth} = useAuth();
  return (
    <>
    <Outlet/>
    </>
  )
}

export default LoginWrapper