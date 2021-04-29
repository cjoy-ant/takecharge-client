import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <header>
        <Link to="/" exact="true" className="Nav__home">TakeCharge</Link>
      </header>
      <nav className="Nav__links">
        <Link to="/about" exact="true">
          About
        </Link>
        <Link to="/providers" exact="true">
          Providers
        </Link>
        <Link to="/visits" exact="true">
          Visits
        </Link>
        <Link to="/recommendations" exact="true">
          Recommendations
        </Link>
      </nav>
    </div>
  );
}
