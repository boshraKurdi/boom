import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequierAuth(){
   const location = useLocation();
   const { token } = useSelector((state) => state.auth) 
   return token ? <Outlet /> : <Navigate state={{form : location}} replace to='/login' />
}