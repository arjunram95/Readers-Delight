import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = ({ onSignOut }) => {
  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link to="/homepage">Home</Link>
        </div>
        <div className="nav-right">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
