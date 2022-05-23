import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Styles/BasicStyle.css";
import {message} from "antd";
import { Link } from "react-router-dom";
import * as CryptoJS from 'crypto-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import SellerNavBar from "../SellerNavBar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // const [invalidEMail,setInvalidEmail] = useState(false);
  const [invalidPassword,setInvalidPassword] = useState(false);

  const [errorMessage,setErrorMessage] = useState("");

 
  // function onEmailEnter(email){
  //   var emailCheck =
  //     /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  //   if (emailCheck.test(email) === false) {
  //     return setInvalidEmail(true);
  //   }
  //   else{
  //     setInvalidEmail(false)
  //   }
  // }
  function onPasswordEnter(password){
    if(password === ""){
      return setInvalidPassword(true);
    }
    else{
      setInvalidPassword(false)
    }
  }
  async function GlobalPost(){
    const userid = username;
    axios.post("http://localhost:3001/api/login/seller",{userid,password})
    .then((resp) => {
      window.localStorage.setItem("jwt_user_token",resp.data.token);
      window.localStorage.setItem("jwt_username",userid);
      navigate(`/${username}/profile`)
        console.log(resp)
    })
    .catch((err) => {
      setErrorMessage(err.response.data.message) 
    })
    }

  return (
   <>
   <SellerNavBar/>
    <div id="parent_Login">
      <div id="child_Login">
        <center>
          <h2>Log In-M</h2>
        </center>
        <br/>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => {
          setUsername(e.target.value);
          setErrorMessage("")
        }}
        
      />
      <br /> <br /> <br/>
      <TextField
      error={invalidPassword}
      helperText={invalidPassword ? "Invalid Password" : ""}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        name="password"
        onChange={(e) => {
          onPasswordEnter(e.target.value)
          setPassword(e.target.value);
          setErrorMessage("");
        }}
      /><br /> <br /> 
        
      <center><Button onClick={() => GlobalPost()} variant="contained" 
      disabled={errorMessage.length > 10 ? true : false}
      >
          Login
      </Button></center>
      <br /> 
      <center>
       <p style={{color:"red"}}> {errorMessage &&<Alert severity="error">{errorMessage}</Alert>
}</p>
        </center>
      
      <div id="bttnsofLogin">
     <Link exact to="/seller/forgot-password">
     <p id="forgotPass">
      Forgot Password?
      </p>
     </Link>
       <Link exact to="/seller/sign-up">
       <Button variant="outlined" > Sign Up
        </Button>
       </Link>
      </div>
      </div>
    </div></>
  );
}
