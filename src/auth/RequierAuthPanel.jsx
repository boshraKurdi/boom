import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Forbidden403 from "../components/Forbidden403";


export default function RequierAuthPanel({ allowedRole }){
   const location = useLocation();
   const { token , user } = useSelector((state) => state.auth) 
   return token ?  allowedRole.includes(user?.role) ? <Outlet /> : <Forbidden403 /> : <Navigate state={{form : location}} replace to='/' />
}