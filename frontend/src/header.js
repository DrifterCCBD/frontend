import React from "react";
import './header.css'
import './index.css'
import { Link, } from "react-router-dom";
import logout from "./logout"


function Header() {
    
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Drifter</div>
      </Link>
      <nav>
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

export default Header;
