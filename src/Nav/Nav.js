import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <div className="header">
        <header>TakeCharge</header>
      </div>
      <nav>
        <Link to="/" exact="true">
          Home
        </Link>
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
