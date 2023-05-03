import React from "react";
import './headerDriver.css'
import './index.css'
import { Link, useLocation } from "react-router-dom";
import logout from "./logout"


function HeaderDriver() {
    const location = useLocation();
    
  return (
    <header className="header">
      <Link to="/mytripsDriver">
        <div className="logo">Drifter</div>
      </Link>
      <nav>
        <Link
          to="/mytripsDriver"
          className={location.pathname === "/mytripsDriver" ? "active" : ""}
        >
          My trips
        </Link>
        <Link
          to="/profileDriver"
          className={location.pathname === "/profileDriver" || location.pathname === "/editprofileDriver" ? "active" : ""}
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

export default HeaderDriver;
