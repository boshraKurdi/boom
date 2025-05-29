import {
  LayoutDashboard,
  BarChart,
  Map,
  FileText,
  Megaphone,
  Gift,
  AlertTriangle,
  CalendarClock,
  MapPin,
  ListOrdered,
  Users,
  HeartHandshake,
  BookOpenCheck,
  Shield,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [check, setCheck] = useState("Dashboard");
  return (
    <aside className="sidebar-dashboard">
      <div className="main-dashboard">
        <h2 className="logo-dashboard">
          <AlertTriangle /> {t("for-syria-safety")}
        </h2>
        <p>{t("danger prospecting system")}</p>
      </div>
      <nav>
        <ul>
          {user?.role == "admin" && (
            <>
              <li
                className={check === "Dashboard" ? "active" : ""}
                onClick={() => {
                  nav("/dashboard");
                  setCheck("Dashboard");
                }}
              >
                <LayoutDashboard size={18} /> {t("Dashboard")}
              </li>
              <li
                className={check === "Statistics" ? "active" : ""}
                onClick={() => {
                  nav("Statistic");
                  setCheck("Statistics");
                }}
              >
                <BarChart size={18} /> {t("Statistics")}
              </li>
              <li
                className={check === "Compaigns" ? "active" : ""}
                onClick={() => {
                  nav("compaigns");
                  setCheck("Compaigns");
                }}
              >
                <Megaphone size={18} /> {t("Compaigns")}
              </li>
              <li
                className={check === "Locations" ? "active" : ""}
                onClick={() => {
                  nav("locations");
                  setCheck("Locations");
                }}
              >
                <MapPin size={18} /> {t("Locations")}
              </li>
              <li
                className={check === "Rewards" ? "active" : ""}
                onClick={() => {
                  nav("rewards");
                  setCheck("Rewards");
                }}
              >
                <Gift size={18} /> {t("Rewards")}
              </li>
              <li
                className={check === "Units" ? "active" : ""}
                onClick={() => {
                  nav("unit");
                  setCheck("Units");
                }}
              >
                <Shield size={18} /> {t("Units")}
              </li>
              <li
                className={check === "Appointments" ? "active" : ""}
                onClick={() => {
                  nav("appointments");
                  setCheck("Appointments");
                }}
              >
                <CalendarClock size={18} /> {t("Appointments")}
              </li>
              <li
                className={check === "Donations" ? "active" : ""}
                onClick={() => {
                  nav("donation");
                  setCheck("Donations");
                }}
              >
                <HeartHandshake size={18} /> {t("Donations")}
              </li>
                <li
            onClick={() => {
              nav("report");
              setCheck("Reports");
            }}
            className={check === "Reports" ? "active" : ""}
          >
            <FileText size={18} /> {t("Reports")}
          </li>
          <li
            onClick={() => {
              nav("learn");
              setCheck("Learns");
            }}
            className={check === "Learns" ? "active" : ""}
          >
            <BookOpenCheck size={18} /> {t("Learns")}
          </li>
              <li
              className={check === "Teams" ? "active" : ""}
              onClick={() => {
                nav("teams");
                setCheck("Teams");
              }}
            >
              <Users size={18} /> {t("Teams")}
            </li>
         
            </>
          )}
          {/* <li
            className={check === "Steps" ? "active" : ""}
            onClick={() => {
              nav("steps");
              setCheck("Steps");
            }}
          >
            <ListOrdered size={18} /> Steps
          </li> */}
          {user?.role == "member" && (
        <>
         <li
                className={check === "Dashboard" ? "active" : ""}
                onClick={() => {
                  nav("/dashboard");
                  setCheck("Dashboard");
                }}
              >
                <LayoutDashboard size={18} /> {t("Dashboard")}
              </li>
              <li
                className={check === "Statistics" ? "active" : ""}
                onClick={() => {
                  nav("Statistic");
                  setCheck("Statistics");
                }}
              >
                <BarChart size={18} /> {t("Statistics")}
              </li>
             <li
            onClick={() => {
              nav("member");
              setCheck("member");
            }}
            className={check === "member" ? "active" : ""}
          >
            <BookOpenCheck size={18} /> {t("my reports")}
          </li>
          </>
            
          )}
          {/* <li
            className={check === "Teampositions" ? "active" : ""}
            onClick={() => {
              nav("Teampositions");
              setCheck("Teampositions");
            }}
          >
            <BadgeCheck size={18} /> Teampositions
          </li> */}
        
        </ul>
      </nav>
      <div className="user-dashboard">
        <div className="avatar-dashboard">A</div>
        <div>
          <strong>{t("Admin User")}</strong>
          <br />
          <small>{t("Safety Operator")}</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
