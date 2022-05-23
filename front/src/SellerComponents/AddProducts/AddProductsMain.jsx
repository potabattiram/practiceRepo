import React from "react";
import SellerNavBar from "../SellerNavBar";
import { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";
import "./mainstyle.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import "./mainstyle.css";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const Input = styled("input")({
  display: "none",
});

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 30,
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

const sizes = [
  "12.7cm x 12.7cm",
  "16.5cm x 16.5cm",
  "16.5cm x 12.7cm",
  "30cm x 50cm",
  "50cm x 100cm",
  "70cm x 135cm",
  "100cm x 160cm",
  "50cm x 80cm",
];

const colorsList = [
  "Yellow",
  "Red",
  "Orange",
  "Pink",
  "Blue",
  "Green",
  "Purple",
  "Black",
  "White",
  "Brown",
  "Grey",
  "Peach",
  "Cream",
  "Cyan",
  "Lime",
  "Magenta",
  "Mint",
  "Navy",
  "Olive",
  "Teal",
  "Violet",
  "Beige",
  "Coral",
  "Maroon",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, size_List, theme) {
  return {
    fontWeight:
      size_List.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function AddProductsMain() {
  const [t_name, setT_name] = useState("");
  const [t_type, setT_type] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [brand, setBrand] = useState("");
  const [prize, setPrize] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock_avail, setStock_avail] = useState("");
  const [colors, setColors] = useState("");
  const [gsm, setGsm] = useState();

  const navigate = useNavigate();
  const theme = useTheme();
  // const [loading, setLoading] = useState(false);
  const [size_List, setSize_List] = useState([]);
  const [colors_List, setColors_List] = useState([]);

  const formData = new FormData();
  
  function singleFileFunction(file) {
    formData.append("file", file);
  }

  function MultiFileFunction(files) {
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("file", file);
    }
  }

  const handleChangeforSizes = (event) => {
    const {
      target: { value },
    } = event;
    setSize_List(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeforColors = (e) => {
    const {
      target: { value },
    } = e;
    setColors_List(
      typeof value === "string" ? value.split(",") : value
    );
  };

  function postProductData() {
    const jsonSizes = JSON.stringify(size_List);
    const jsonColors = JSON.stringify(colors_List);
    setSize(jsonSizes);
    setColors(jsonColors);
    const { username } = useParams();
    let sellerId = username;
    const data = {
      sellerId,
      t_name,
      t_type,
      size,
      material,
      brand,
      prize,
      mrp,
      stock_avail,
      colors,
      gsm,
    };
    let type = t_type.includes("towel") ? 1 : t_type.includes("napkin") ? 2 : 3;
    let dbname =  t_type.includes("towel") ? "towels_products" : t_type.includes("napkin") ? "napkins_products" : "otherFurnishings_products";
    axios.post(`http://localhost:3001/uploadImagewithData/${t_name}/${type}/${dbname}`, {data,formData}).then((res, err) => {
      if (res.status === 200) {
        notification.success({
          message: "Product Added Successfully",
          placement: "topRight",
        });
        navigate("/seller/products");
      } else {
        notification.error({
          message: "Product Not Added",
          placement: "topRight",
        });
      }
    });
  }

  return (
    <>
      <SellerNavBar />

      <div style={{ margin: "1rem" }}>
        <h2>Add your Products here...</h2>

        <div className="gridsdetails">
          <div>
            <TextField
              helperText="e.g. Abella 100% Pure Cotton Bath Towel"
              id="demo-helper-text-aligned"
              label="Product Name"
              className="max_Inputss"
              onChange={(e) => setT_name(e.target.value)}
              variant="outlined"
            />
            <br />
            <FormControlLabel
              control={<Checkbox defaultChecked={false} />}
              onChange={(e) => setStock_avail(e.target.checked ? 1 : 0)}
              label="In Stock"
            />
            <div className="prizesh">
              <span className="prizes">
                <TextField
                  helperText="e.g. 420"
                  id="demo-helper-text-aligned"
                  label="MRP"
                  className="max_Inputs"
                  onChange={(e) => setMrp(e.target.value)}
                  variant="outlined"
                />{" "}
                &#8377; &nbsp;
                <TextField
                  helperText="e.g. 90"
                  id="demo-helper-text-aligned"
                  label="Prize"
                  className="max_Inputs"
                  onChange={(e) => setPrize(e.target.value)}
                  variant="outlined"
                />{" "}
                &#8377;/Piece
                <br />
              </span>
              <InputLabel id="test-select-label">
                Select Product Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-helper-text-aligned"
                // placeholderr="Select Type of Product"
                onChange={(e) => setT_type(e.target.value)}
                style={{ width: "22rem" }}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Wash Cloth Towels"}>Wash Cloth Towels</MenuItem>
                <MenuItem value={"Bath Towels"}>Bath Towels</MenuItem>
                <MenuItem value={"Terry Towels"}>Terry Towels</MenuItem>
                <MenuItem value={"Hand Towels"}>Hand Towel</MenuItem>
                <MenuItem value={"Spa Towels"}>Spa Towel</MenuItem>
                <MenuItem value={"Beach Towels"}>Beach Towel</MenuItem>

                <MenuItem value={"Dinner Napkins"}>Dinner Napkin</MenuItem>
                <MenuItem value={"Snack Napkins"}>Snack Napkin</MenuItem>
                <MenuItem value={"Table Napkins"}>Table Napkin</MenuItem>

                <MenuItem value={"Bath Mat"}>Bath Mat</MenuItem>
                <MenuItem value={"Bed Sheets"}>Bed Sheets</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </div>
            <br />
            <TextField
              helperText="e.g. Jacquard"
              id="demo-helper-text-aligned"
              label="Brand Name"
              className="max_Inputs"
              onChange={(e) => setBrand(e.target.value)}
              variant="outlined"
            />
            &nbsp;
            <TextField
              helperText="e.g. Cotton, Filament"
              id="demo-helper-text-aligned"
              label="Material Used"
              className="max_Inputs"
              onChange={(e) => setMaterial(e.target.value)}
              variant="outlined"
            />
            <br />
            &nbsp;
            <TextField
              helperText="e.g. 400"
              id="demo-helper-text-aligned"
              label="GSM"
              className="max_Inputs"
              onChange={(e) => setGsm(e.target.value)}
              variant="outlined"
            />
            <br />
          </div>

          <div className="imgback">
            {/* SIZES  */}
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Available Colors
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={colors_List}
                onChange={handleChangeforColors}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {colorsList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(size, colors_List, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />

            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Available Sizes
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={size_List}
                onChange={handleChangeforSizes}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {sizes.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, size_List, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            
            <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files.length === 1) {
                singleFileFunction(e.target.files[0]);
              } else {
                MultiFileFunction(e.target.files);
              }
            }}
          />
          </div>
        </div>
        <button onClick={() => postProductData()}>Submit</button>
      </div>
    </>
  );
}
