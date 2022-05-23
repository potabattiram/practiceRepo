import axios from "axios";
import "./BasicStyle.css";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import * as CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { message } from "antd";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
  });

  const [invalidEMail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  function onEmailEnter(email) {
    var emailCheck =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailCheck.test(email) === false) {
      return setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  }
  function onPasswordEnter(password) {
    if (password === "") {
      return setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  }
  function onPhoneEnter(phone) {
    if (phone.length !== 10) {
      return setInvalidPhone(true);
    } else {
      return setInvalidPhone(false);
    }
  }
  // function CheckUsername(value){
  //     axios.get(checkUsernameinDBURL+value)
  //     .then((resp) => {
  //         console.log(resp)
  //         if(resp.status === 404){
  //             setUsernameExists(true)
  //         }
  //         if(resp.status === 200){
  //             setUsernameExists(false)
  //         }
  //     })
  //     .catch((err) => {
  //         console.log(err)
  //     })
  // }
  async function PostSignUpData() {
    try {
      var key = "253D3FB468A0E24677C28A624BE0F939";
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        key
      ).toString();
      axios
        .post("http://localhost:3001/api/sign-up", { hash: ciphertext })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return message.error(error);
    }
  }

  return (
    <div id="parent_Login">
      <div id="child_Login">
        <center>
          <h2>Sign Up</h2>
        </center>
        <br />
        <TextField
          helperText={
            usernameExists ? "Username Exists, Please try another" : ""
          }
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          onChange={(e) => {
            // CheckUsername(e.target.value);
            handleChange(e);
          }}
        />
        <br /> <br />
        <TextField
          helperText={invalidPhone ? "Invalid Phone" : ""}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          name="phone"
          error={invalidPhone}
          onChange={(e) => {
            onPhoneEnter(e.target.value);
            handleChange(e);
          }}
          type="number"
        />
        <br /> <br />
        <TextField
          error={invalidEMail}
          helperText={invalidEMail ? "Invalid Email" : ""}
          id="outlined-basic"
          label="Email ID"
          variant="outlined"
          name="email"
          onChange={(e) => {
            onEmailEnter(e.target.value);
            handleChange(e);
          }}
        />
        <br /> <br />
        <TextField
          error={invalidPassword}
          helperText={invalidPassword ? "Invalid Password" : ""}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          onChange={(e) => {
            onPasswordEnter(e.target.value);
            handleChange(e);
          }}
          type="password"
        />
        <br /> <br />
        <center>
          <Button onClick={() => PostSignUpData()} variant="contained">
            Sign Up
          </Button>
        </center>
        <br />
        <div id="bttnsofLogin">
          <Link exact to="/forgot-password">
            <p id="forgotPass">Forgot Password?</p>
          </Link>
          <Link exact to="/login">
            <Button variant="outlined"> Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
