import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

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
          <div>
            <Link to={window.localStorage.getItem("jwt_username") === null ? '/seller/sign-up' : `${window.localStorage.getItem("jwt_username")}/profile`} style={{textDecoration:"none"}}>
              <button id="sellmyProducts">Sell my Products</button>
            </Link>
          </div>
        </div>
        {/* Pages Section */}
        <div>
          <button>Cart</button>
          <button>My Orders</button>
          <button></button>
        </div>
      </div>
    </div>
  );
}
