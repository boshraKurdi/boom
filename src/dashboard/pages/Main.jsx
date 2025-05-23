import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Home from './Home';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div className="app-container-dashboard">
      <Sidebar />
      <div className="main-section-dashboard">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
