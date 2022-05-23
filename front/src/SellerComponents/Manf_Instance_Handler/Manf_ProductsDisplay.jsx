import { useState, useEffect } from "react";
import useSWR from "swr";
import "./mainStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Select } from 'antd';

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 38,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: "1rem",
      },
    },
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function AllTowels() {
  const history = useNavigate();
  const { username } = useParams();

  const url = `http://localhost:3001/getproducts/homepage/towels_products/${username}`;
  const { data, error } = useSWR(url, fetcher);

  return (
    <>
      <div className="allgrids">
        {data ? (
          data.map((info) => {
            return (
              <div className="grid" key={info.id}>
                {/* <img
                  src={info.ImageFile}
                  id="imgtop"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/towelinfo/${info.id}`);
                  }}
                /> */}
                <br />
                <div
                  className="content"
                  style={{ cursor: "pointer" }}
                //   onClick={() => {
                    // history.push(`/towelinfo/${info.id}`);
                //   }}
                >
                  <span id="towel_Heads">
                    {info.t_name}
                    <br />
                    Prize: &nbsp;
                    <span style={{ color: "green" }}>&#x20b9;{info.prize}</span> MRP:&nbsp;<span style={{ color: "green" }}>&#x20b9;{info.mrp}</span>
                  </span><br/>
                  {info.stock_avail === 1 ? <span style={{color:'green'}}>In Stock</span> : <span style={{color:'red'}}>Out of Stock</span> }
                  <br/>
                 {window.localStorage.getItem("jwt_user_token") !== null ? 
                 <>
                    <button>Preview</button>
                    <button>Edit</button>
                    </>
                :
                null}
                </div>
                <br/>
              </div>
            );
          })
        ) : (
          <>
            <center>
              <CircularProgress size={23} />
            </center>
          </>
        )}
      </div>
    </>
  );
}
