import React from "react";
import './headerRider.css'
import './index.css'
import { Link, useLocation } from "react-router-dom";
import logout from "./logout"

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
          to="/availableRoutesRider"
          className={location.pathname === "/availableRoutesRider" ? "active" : ""}>
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
        <Link
          to="/"
          onClick={logout}
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}

export default HeaderRider;
