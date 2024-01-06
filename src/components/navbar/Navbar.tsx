// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import WeatherLogo from "../../assets/WeatherLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCityUserLookingFor,
  setTemperatureUnit,
} from "../../store/slices/weatherSlice";
import { Typography, Switch } from "@mui/material";
import { RootState } from "../../store/store";
import { useTheme } from "@mui/system";

// import IconButton from "@mui/material/IconButton";
// import Brightness6Icon from "@mui/icons-material/Brightness6";

function Navbar() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const temperatureUnit = useSelector(
      (state: RootState) => state.weather.temperatureUnit
  );

  const handleToggleUnit = () => {
    // Toggle between Celsius and Fahrenheit
    const newUnit = temperatureUnit === "C" ? "F" : "C";
    dispatch(setTemperatureUnit(newUnit));
  };

  const handleHomeClick = () => {

    dispatch(setCurrentCityUserLookingFor({ id: "215854", name: "Tel Aviv" }));
    navigate("/home");
  };

  const handleFavoriteClick = () => {
    navigate("/favorites");
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={WeatherLogo}
              alt="Logo"
              style={{
                display: "flex", // Change to "flex" to ensure the image is initially visible
                [theme.breakpoints.up("md")]: {
                  display: "flex",
                },
                marginRight: 1,
                height: "120px",
                width: "150px",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OhadWeather
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">°C</Typography>
            <Switch
              color="default"
              checked={temperatureUnit === "F"}
              onChange={handleToggleUnit}
            />
            <Typography variant="body1" sx={{ marginRight: 2.5 }}>
              °F
            </Typography>
            <Button variant="text" color="inherit" onClick={handleHomeClick}>
              Home
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={handleFavoriteClick}
            >
              Favorite
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
