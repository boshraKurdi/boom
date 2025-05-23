import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequierBack(){
    const { token } = useSelector((state) => state.auth);
    return token ? <Navigate to='/' /> : <Outlet />;
}