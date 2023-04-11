import React from "react";
import './headerDriver.css'
import './index.css'
import { Link, useLocation } from "react-router-dom";

function HeaderDriver() {
    const location = useLocation();
    
  return (
    <header className="header">
      <Link to="/mytrips">
        <div className="logo">Drifter</div>
      </Link>
      <nav>
        <Link to="/notifications" className={location.pathname === "/notifications" ? "active" : ""}>
          Notifications
        </Link>
        <Link
          to="/routes"
          className={location.pathname === "/routes" ? "active" : ""}>
          Routes
        </Link>
        <Link
          to="/mytrips"
          className={location.pathname === "/mytrips" ? "active" : ""}
        >
          MyTrips
        </Link>
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}

export default HeaderDriver;