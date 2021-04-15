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
        <Link to="/" exact>
          Home
        </Link>
        <Link to="/about" exact>
          About
        </Link>
        <Link to="/providers" exact>
          Providers
        </Link>
        <Link to="/visits" exact>
          Visits
        </Link>
        <Link to="/recommendations" exact>
          Recommendations
        </Link>
      </nav>
    </div>
  );
}
