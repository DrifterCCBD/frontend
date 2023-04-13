import React from "react";
import './headerDriver.css'
import './index.css'
import { Link, useLocation } from "react-router-dom";

function HeaderDriver() {
    const location = useLocation();
    
  return (
    <header className="header">
      <Link to="/mytripsDriver">
        <div className="logo">Drifter</div>
      </Link>
      <nav>
        <Link to="/notificationsDriver" className={location.pathname === "/notificationsDriver" ? "active" : ""}>
          Notifications
        </Link>
        <Link
          to="/routes"
          className={location.pathname === "/routes" ? "active" : ""}>
          Routes
        </Link>
        <Link
          to="/mytripsDriver"
          className={location.pathname === "/mytripsDriver" ? "active" : ""}
        >
          MyTrips
        </Link>
        <Link
          to="/profileDriver"
          className={location.pathname === "/profileDriver" || location.pathname === "/editprofileDriver" ? "active" : ""}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}

export default HeaderDriver;
