import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const Auth=localStorage.getItem("loggedIn")
  return Auth ? children || <Outlet/> : <Navigate to={"/login"} />
}

export default PrivateRoute