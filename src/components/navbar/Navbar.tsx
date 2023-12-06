import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import WeatherLogo from "../../assets/WeatherLogo.png";
import { useDispatch } from "react-redux";
import { setCurrentCityUserLookingFor } from "../../store/slices/weatherSlice";
import { Typography } from "@mui/material";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    console.log("handleHomeClick triggered");
    console.log("Updating currentCityUserLookingFor to Tel Aviv");
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
                display: { xs: "none", md: "flex" },
                marginRight: 1,
                height: "130px",
                width: "170px",
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
          <Box sx={{ display: "flex" }}>
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
