import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./BasicStyle.css";
import { message } from "antd";
import * as CryptoJS from 'crypto-js';
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [invalidEMail, setInvalidEmail] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidOTP,setInvalidOTP] = useState(false);

  const [currentState, setCurrentstate] = useState(1);

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

  function onOTPEnter(otpValue) {
    if (otpValue && otpValue.length === 4) {
      return setInvalidOTP(true);
    }
    else{
      setInvalidOTP(false)
    }
  }
  
  async function GloBalPost(str) {
    try {
      const data =
        str === "email"
          ? email
          : str === "otp"
          ? otp
          : str === "password"
          ? password
          : null;
          var key  = "253D3FB468A0E24677C28A624BE0F939";
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
      axios.post("http://localhost:3001/api/forgot-password",{hash:ciphertext})
      .then((resp) => {
          console.log(resp)
      })
      .catch((err) => {
          console.log(err)
      })
      console.log(data);
    } catch (error) {
      return message.error();
    }
  }

  return (
    <div id="parent_Login">
      <div id="child_Login">
        {currentState === 1 ? (
          <>
            <div>
              <center>
                <h2>Forgot Password</h2>
              </center>
              <br />
              <TextField
                error={invalidEMail}
                helperText={invalidEMail ? "Invalid Email" : ""}
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                name="email"
                onChange={(e) => {
                  onEmailEnter(e.target.value);
                  setEmail(e.target.value);
                }}
              />
              <br /> <br /> <br />
              <center>
                <Button style={{ float: "left" }} disabled variant="contained">
                  Back
                </Button>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    setCurrentstate(currentState + 1);
                    GloBalPost("email");
                  }}
                  disabled={invalidEMail}
                  variant="contained"
                >
                  Get OTP
                </Button>
              </center>
            </div>
          </>
        ) : currentState === 2 ? (
          <>
            <div>
              <center><h2>Enter OTP</h2></center> <br />
              <TextField
              error={!invalidOTP}
                label="Enter OTP"
                helperText={!invalidOTP ? "Incorrect OTP" : ""}
                id="outlined-basic"
                variant="outlined"
                name="otp"
                onChange={(e) => {
                  onOTPEnter(e.target.value);
                  setOtp(e.target.value);
                }}
              />
              <br /> <br /> <br />
              <center>
              <Button
              // disabled={}
                  style={{float:"left"}}
                  variant="contained"
                  onClick={() => setCurrentstate(currentState - 1)}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setCurrentstate(currentState + 1);
                    GloBalPost("otp");
                  }}
                  style={{float:"right"}}
                  variant="contained"
                  disabled={!invalidOTP}
                >
                  Validate OTP
                </Button>
              </center>
            </div>
          </>
        ) : currentState === 3 ? (
          <>
            <div>
              <center>
              <h2>Enter Password</h2>
              </center>
              <br/>
              <TextField
                error={invalidPassword}
                helperText={invalidPassword ? "Invalid Password" : ""}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                onChange={(e) => {
                  onPasswordEnter(e.target.value);
                  setPassword(e.target.value)
                }}
                type="password"
              />
              <br /> <br />
              <center>
                <Button
                  onClick={() => GloBalPost("password")}
                  variant="contained"
                >
                  Login
                </Button>
              </center>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
