import React from "react";
import './headerRider.css'
import './index.css'
import { Link, useLocation } from "react-router-dom";

function HeaderRider() {
    const location = useLocation();
    
  return (
    <header className="header">
      <Link to="/mytripsRider">
        <div className="logo">Drifter</div>
      </Link>
      <nav>
        <Link to="/notificationsRider" className={location.pathname === "/notificationsRider" ? "active" : ""}>
          Notifications
        </Link>
        <Link
          to="/routes"
          className={location.pathname === "/routes" ? "active" : ""}>
          Routes
        </Link>
        <Link
          to="/mytripsRider"
          className={location.pathname === "/mytripsRider" ? "active" : ""}
        >
          MyTrips
        </Link>
        <Link
          to="/profileRider"
          className={location.pathname === "/profileRider" || location.pathname === "/editprofileRider" ? "active" : ""}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}

export default HeaderRider;
