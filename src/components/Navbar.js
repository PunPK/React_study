import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navigation-menu">
      <ol>
        <li>
          <Link to={"/finance"}>finance</Link>
        </li>
        <li>About</li>
        <li>Home</li>
      </ol>
    </div>
  );
}

export default Navbar;
