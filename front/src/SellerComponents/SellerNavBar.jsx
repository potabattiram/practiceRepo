import React from "react";
import { Link } from "react-router-dom";
import "./Auth/Styles/NavBarStyle.css";

export default function NavBar() {
  return (
    <div>
      <div className="navbar">
        <div id="navTopCompo">
          <Link to="/" style={{textDecoration:"none"}}>
            <div>Logo</div>
          </Link>
          <div>
            <input
              type="text"
              id="searchBar"
              placeholder="Search for Products"
            />
          </div>
        </div>
        {/* Pages Section */}
      </div>
    </div>
  );
}
