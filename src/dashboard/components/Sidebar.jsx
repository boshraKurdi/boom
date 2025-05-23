import {
  LayoutDashboard,
  BarChart,
  Map,
  FileText,
  Megaphone,
  Gift,
  AlertTriangle,
  MapPin,
  ListOrdered,
  Users,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const nav = useNavigate();
  const [check, setCheck] = useState("Dashboard");
  return (
    <aside className="sidebar-dashboard">
      <div className="main-dashboard">
        <h2 className="logo-dashboard">
          <AlertTriangle /> Mine Sentinel
        </h2>
        <p>danger prospecting system</p>
      </div>
      <nav>
        <ul>
          <li
            className={check === "Dashboard" ? "active" : ""}
            onClick={() => {
              nav("/dashboard");
              setCheck("Dashboard");
            }}
          >
            <LayoutDashboard size={18} /> Dashboard
          </li>
          <li
            className={check === "Statistics" ? "active" : ""}
            onClick={() => {
              nav("Statistic");
              setCheck("Statistics");
            }}
          >
            <BarChart size={18} /> Statistics
          </li>
          <li
            className={check === "Compaigns" ? "active" : ""}
            onClick={() => {
              nav("compaigns");
              setCheck("Compaigns");
            }}
          >
            <Megaphone size={18} /> Compaigns
          </li>
          <li
            className={check === "Locations" ? "active" : ""}
            onClick={() => {
              nav("locations");
              setCheck("Locations");
            }}
          >
            <MapPin size={18} /> Locations
          </li>
          <li
            className={check === "Rewards" ? "active" : ""}
            onClick={() => {
              nav("rewards");
              setCheck("Rewards");
            }}
          >
            <Gift size={18} /> Rewards
          </li>
          {/* <li
            className={check === "Steps" ? "active" : ""}
            onClick={() => {
              nav("steps");
              setCheck("Steps");
            }}
          >
            <ListOrdered size={18} /> Steps
          </li> */}
          <li
            className={check === "Teams" ? "active" : ""}
            onClick={() => {
              nav("teams");
              setCheck("Teams");
            }}
          >
            <Users size={18} /> Teams
          </li>
          {/* <li
            className={check === "Teampositions" ? "active" : ""}
            onClick={() => {
              nav("Teampositions");
              setCheck("Teampositions");
            }}
          >
            <BadgeCheck size={18} /> Teampositions
          </li> */}
          <li
            onClick={() => {
              nav("report");
              setCheck("Reports");
            }}
            className={check === "Reports" ? "active" : ""}
          >
            <FileText size={18} /> Reports
          </li>
          <li
            onClick={() => {
              nav("learn");
              setCheck("Learns");
            }}
            className={check === "Learns" ? "active" : ""}
          >
            <FileText size={18} /> Learns
          </li>
        </ul>
      </nav>
      <div className="user-dashboard">
        <div className="avatar-dashboard">A</div>
        <div>
          <strong>Admin User</strong>
          <br />
          <small>Safety Operator</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
