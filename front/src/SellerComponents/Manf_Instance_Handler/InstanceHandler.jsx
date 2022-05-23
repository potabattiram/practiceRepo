import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SellerNavBar from "../SellerNavBar";
import axios from "axios";
import Manf_ProductsDisplay from "./Manf_ProductsDisplay";

export default function InstanceHandler() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    window.localStorage.getItem("jwt_user_token") ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  function LogoutFunction()
  {
    window.localStorage.removeItem("jwt_user_token");
    window.localStorage.removeItem("jwt_username");

    return setLoggedIn(false);
  }

  const { username } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <SellerNavBar />
      <div style={{ margin: "1rem" }}>
        Manufacturer Instance
        <br />
        All {username ? username : "No Username"} Manufacturer Added Products
        displays here!
        <br />
        <br />
        {loggedIn ? (
          <>
            <button onClick={() => navigate(`/${username}/add-products`)}>
              Add more Products
            </button>
            <br />
            <button onClick={() => LogoutFunction()}>Logout</button>
          </>
        )
        :null}
        <br />
        <Manf_ProductsDisplay />
      </div>
    </div>
  );
}
