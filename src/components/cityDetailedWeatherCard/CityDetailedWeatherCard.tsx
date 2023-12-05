// src/components/cityDetailedWeatherCard/CityDetailedWeatherCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/weatherSlice";
import CityDailyWeatherCard from "../cityDailyWeatherCard/CityDailyWeatherCard";

const CityDetailedWeatherCard: React.FC = () => {
  const { cityName, currentConditions, forecast, favorites } = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch();

  console.log("Current Conditions:", currentConditions);
  console.log("Favorites:", favorites);

  const isFavorite = favorites.some((fav) => {
    console.log("Favorite ID:", fav.id);
    console.log("Current City Key:", currentConditions?.cityKey);
    return fav.id === currentConditions?.cityKey;
  });

  const handleToggleFavorite = () => {
    console.log("Toggling favorite:", isFavorite);

    if (isFavorite) {
      dispatch(removeFromFavorites(currentConditions?.cityKey || ""));
    } else {
      dispatch(
        addToFavorites({
          id: currentConditions?.cityKey || "",
          name: cityName,
          currentConditions: currentConditions!,
        })
      );
    }
    console.log('Redux state after dispatch:', store.getState().weather);

  };

  return (
    <Card style={{ width: "80%", margin: "auto", position: "relative" }}>
      <Button
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: isFavorite ? "red" : "initial",
        }}
        onClick={handleToggleFavorite}
      >
        Favorite
      </Button>

      <CardContent>
        <Typography
          variant="h4"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          {cityName}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          Current Temperature: {currentConditions?.temperature} °F
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          Weather Conditions: {currentConditions?.weatherText || "N/A"}
        </Typography>
      </CardContent>

      {/* Using Grid for responsive layout */}
      <Grid container spacing={2} justifyContent="space-between">
        {forecast.DailyForecasts.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            {/* Assuming CityDailyWeatherCard receives date prop */}
            {/* Modify accordingly based on your CityDailyWeatherCard component */}
            <CityDailyWeatherCard date={data.Date} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default CityDetailedWeatherCard;
