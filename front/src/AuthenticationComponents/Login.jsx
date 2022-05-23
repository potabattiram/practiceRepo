import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./BasicStyle.css";
import {message} from "antd";
import { Link } from "react-router-dom";
import * as CryptoJS from 'crypto-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';


export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [invalidEMail,setInvalidEmail] = useState(false);
  const [invalidPassword,setInvalidPassword] = useState(false);

  const [errorMessage,setErrorMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
 
  function onEmailEnter(email){
    var emailCheck =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailCheck.test(email) === false) {
      return setInvalidEmail(true);
    }
    else{
      setInvalidEmail(false)
    }
  }
  function onPasswordEnter(password){
    if(password === ""){
      return setInvalidPassword(true);
    }
    else{
      setInvalidPassword(false)
    }
  }
  async function GlobalPost(){
    try{
    var key  = "253D3FB468A0E24677C28A624BE0F939";
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    axios.post("http://localhost:3001/api/login",{hash:ciphertext})
    .then((resp) => {
        window.localStorage.setItem("token",resp.data.token) && navigate("/")
        console.log(resp)
    })
    .catch((err) => {
      setErrorMessage(err.response.data.message) 
    })
    }
    catch(error){
        return message.error(error)
    }

}
  return (
    <div id="parent_Login">
      <div id="child_Login">
        <center>
          <h2>Log In</h2>
        </center>
        <br/>
      <TextField
        error={invalidEMail}
        helperText={invalidEMail ? "Invalid Email" : ""}
        id="outlined-basic"
        label="Email ID"
        variant="outlined"
        name="email"
        onChange={(e) => {
          onEmailEnter(e.target.value)
          handleChange(e);
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
          handleChange(e);
        }}
      /><br /> <br /> 
        
      <center><Button onClick={() => GlobalPost()} variant="contained" 
      // disabled={errorMessage.length > 10 ? true : false}
      >
          Login
      </Button></center>
      <br /> 
      <center>
       <p style={{color:"red"}}> {errorMessage &&<Alert severity="error">{errorMessage}</Alert>
}</p>
        </center>
      
      <div id="bttnsofLogin">
     <Link exact to="/forgot-password">
     <p id="forgotPass">
      Forgot Password?
      </p>
     </Link>
       <Link exact to="/signup">
       <Button variant="outlined" > Sign Up
        </Button>
       </Link>
      </div>
      </div>
    </div>
  );
}
