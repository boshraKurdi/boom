import React, { useState } from "react";
import { FaHome, FaUsers, FaBookOpen } from "react-icons/fa";
import { MdReport, MdEvent } from "react-icons/md";
import { ChevronDown, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActAuthLogout } from "../store/Auth/AuthSlice";
import ButtonLoading from "./ButtonLoading";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import Logo from '../assets/logo2.png'

const Header = () => {
  const { t, i18n } = useTranslation();
  const { token, loading, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const nav = useNavigate();
  function onLogout() {
    console.log("logout");
    const promise = dispatch(ActAuthLogout())
      .unwrap()
      .then(() => {
        nav("/login");
      })
      .catch(() => {});
    return () => {
      promise.abort();
    };
  }
  return (
    <header>
      <h1>
        <img
          style={{ width: "120px", marginLeft: "-1rem" , marginRight: "-1rem" }}
          src={Logo}
          alt="logo"
        />
        {/* <AlertTriangle/> */}
        {/* {t("LandmineGuardian")}
         */}
         {/* {"for syria safety"} */}
      </h1>
      <nav className="nav-links">
        <Link to="/">
          <FaHome /> {t("Home")}
        </Link>
        <Link to="/Report">
          <MdReport /> {t("Report")}
        </Link>
        <Link to="/Team">
          <FaUsers /> {t("Teams")}
        </Link>
        <Link to="/Education">
          <FaBookOpen /> {t("Education")}
        </Link>
        <Link to="/Campaigns">
          <MdEvent /> {t("Events")}
        </Link>
      </nav>
      <div className="header-actions">
        <select
          className="language-select"
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          value={i18n.language}
        >
          <option value="en">🇺🇸 EN</option>
          <option value="ar">🇸🇦 AR</option>
        </select>
        {token ? (
          <div className="user-menu">
            <button className="user-btn" onClick={toggleMenu}>
              <User size={20} />
              {/* <span>{user.name}</span>
            <ChevronDown size={18} /> */}
            </button>

            {menuOpen && (
              <div className="dropdown">
                <div onClick={()=>{nav('/profile')}} className="dropdown-item">
                  <User size={16} />
                  <span>{t("Profile")}</span>
                </div>
                <div className="dropdown-item" onClick={onLogout}>
                  <LogOut size={16} />
                  <span>
                    {loading === "pending" ? (
                      <ButtonLoading />
                    ) : (
                      `${t("Logout")}`
                    )}
                  </span>
                </div>
                {user.role == "admin" ? (
                  <div
                    onClick={() => {
                      nav("/dashboard");
                    }}
                    className="dropdown-item"
                  >
                    <LogOut size={16} />
                    <span>{t("Dashboard")}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              nav("/Login");
            }}
            className="button-primary"
          >
            {t("Login")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
