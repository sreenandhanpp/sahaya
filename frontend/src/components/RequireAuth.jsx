import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { getItem } from "../localStorage/getItem";
import { useEffect } from "react";
import Login from "../src/pages/Login";



export const RequireAuth = ({ children }) => {
  const navigate = useNavigate()
    const data = getItem('user');
    if(data){
      return children
    }
    return (
      <div>
        <Login />
      </div>
    )
}