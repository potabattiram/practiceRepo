import axios from "axios";
import "./Styles/BasicStyle.css";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import * as CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import SellerNavBar from "../SellerNavBar";
import "antd/dist/antd.css"

export default function SignUp() {
  const [business_name, setBusiness_name] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [telephone, setTelephone] = useState("");
  const [pswd, setPswd] = useState("");

  const navigate = useNavigate();
  const [state, setState] = useState(0);

  const [invalidEMail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [invalidPIN, setInvalidPIN] = useState(false);

  const [respMsg,setRespMsg] = useState("");

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

  function onPINInvalid(pin) {
    if (pin.length !== 6) {
      setInvalidPIN(true);
      return false;
    } else {
      setInvalidPIN(false);
      return true;
    }
  }
  function onOTPEnter(oneTp) {
    if (oneTp.length !== 4) {
      setInvalidOTP(true);
      return false;
    } else {
      setInvalidOTP(false);
      return true;
    }
  }

  async function otpSendToEmail(){
    await axios.post("http://localhost:3001/api/verify-email", {email})
    // await axios.post("http://localhost:3001/api/verify-email", {email})
    .then((res) => {
      if(res.status === 200)
      {
        setState(state+1);
      }
      else{
        setState(state)
      }
    })
    .catch((er) =>  {
      if(er.response.status === 409)
      {
        setRespMsg("Account already created on this email, Please Log-In!")
      }
    })

  }

  async function OTPVerify(){
    await axios.post("http://localhost:3001/api/otp-verify", {email, otp})
    // await axios.post("http://localhost:3001/api/otp-verify", {email, otp})

    .then((res) => {
      if(res.status === 200){
        message.success("OTP verified");
      setState(state+1);
      return true;
      }
    })
    .catch((err) => {
      console.log(err);
      message.error("Error in verifying OTP");
      return false;
    })
    
  }

  async function PostSignUpData() {
    try {
      axios
        .post("http://localhost:3001/api/sign-up/seller", {
          business_name,
          email,
          city,
          pin,
          telephone,
          pswd
        })
        .then((resp) => {
          window.localStorage.setItem("jwt_user_token",resp.data.token);
        window.localStorage.setItem("jwt_username",business_name);
          navigate(`/${business_name}/profile`)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return message.error(error);
    }
  }

  function checkStateforZero() {
    if (email === "" && business_name === "" && !invalidEMail) {
      return false;
    } else {
      return otpSendToEmail();
    }
  }
  function checkStateforOne() {
    if (invalidOTP) {
      return false;
    } else {
      return OTPVerify() && true;
    }
  }

  function checkStatefortwo() {
    if (city === "" && pin === "" && !invalidPIN) {
      return false;
    } else {
      return setState(state+1);
    }
  }

  function checkStateforThree() {
    if (telephone === "" || pswd === "") {
      return false;
    } else {
      return PostSignUpData();
    }
  }
  return (
    <>
      <SellerNavBar />
      <br />
      <div id="parent_Login">
        <div id="child_Login">
          <div id="belowChild">
            {state === 0 ? (
              <>
                <center>
                  <h2>Seller Registration</h2>
                  <br/>  <Button onClick={() => navigate("/:username/profile")}>Pass</Button>
                </center>
               <div>
                 
                <br />
                <TextField
                  id="outlined-basic"
                  label="Business Name"
                  variant="outlined"
                  onChange={(e) => {
                    setBusiness_name(e.target.value);
                    setRespMsg("");
                  }}
                />
                <br />
                <br />
                <TextField
                  error={invalidEMail}
                  helperText={invalidEMail ? "Invalid Email" : ""}
                  id="outlined-basic"
                  label="Company Email"
                  variant="outlined"
                  onChange={(e) => {
                    onEmailEnter(e.target.value);
                    setEmail(e.target.value);
                    setRespMsg("");
                  }}
                />
               </div>
                <div style={{color:"red",margin:"2px"}}>
                {respMsg}
                </div>
                <div id="bttnsofLogin">
                  <Button disabled={true}>Back</Button>
                  <Button
                    onClick={() => {
                      checkStateforZero();
                    }}
                  >
                    Send OTP
                  </Button>
                  
                </div><br/>
                  
              </>
            ) : state === 1 ? (
              <>
                <center>
                  <h2>Email Verification</h2>
                  <br />
                  <p>Enter 6-Digit OTP, sent on {email}</p>
                </center>
                <br />
                <TextField
                  helperText={invalidOTP ? "Invalid OTP" : ""}
                  id="outlined-basic"
                  label="4-Digit OTP"
                  variant="outlined"
                  error={invalidOTP}
                  onChange={(oneTP) => {
                    onOTPEnter(oneTP.target.value);
                    setOtp(oneTP.target.value);
                  }}
                  maxLength={4}
                  type="tel"
                />
                <br />
                <br />

                <div id="bttnsofLogin">
                  <Button onClick={() => setState(state - 1)}>Back</Button>
                  <Button
                    onClick={() => {
                      checkStateforOne();
                    }}
                  >
                    Verify OTP
                  </Button>
                </div>
              </>
            ) : state === 2 ? (
              <>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  name="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <br />
                <br />
                <TextField
                  error={invalidPIN}
                  helperText={invalidPIN ? "Invalid Email" : ""}
                  id="outlined-basic"
                  label="PIN Code"
                  variant="outlined"
                  name="pin"
                  onChange={(e) => {
                    onPINInvalid(e.target.value);
                    setPin(e.target.value);
                  }}
                />

                <br />
                <br />

                <div id="bttnsofLogin">
                  <Button onClick={() => setState(state - 1)}>Back</Button>
                  <Button
                    onClick={() => {
                      checkStatefortwo();
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : state === 3 ? (
              <>
                <br />
                <br />
                <TextField
                  helperText={invalidPhone ? "Invalid Phone" : ""}
                  id="outlined-basic"
                  label="Mobile Number"
                  variant="outlined"
                  name="telephone"
                  error={invalidPhone}
                  onChange={(e) => {
                    onPhoneEnter(e.target.value);
                    setTelephone(e.target.value);
                  }}
                  type="number"
                />
                <br />
                <br />
                <TextField
                  error={invalidPassword}
                  helperText={invalidPassword ? "Invalid Password" : ""}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="pswd"
                  onChange={(e) => {
                    onPasswordEnter(e.target.value);
                    setPswd(e.target.value);
                  }}
                />
                <br />
                <br />
                <div id="bttnsofLogin">
                  <Button onClick={() => setState(state - 1)}>Back</Button>
                  <Button
                    onClick={() => {
                      checkStateforThree();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : null}
          </div>
          <div id="bttnsofLogin">
            <Link
              exact
              to="/seller/forgot-password"
              style={{ textDecoration: "none" }}
            >
              <p id="forgotPass">Forgot Password?</p>
            </Link>
            <Link exact to="/seller/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined"> Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
