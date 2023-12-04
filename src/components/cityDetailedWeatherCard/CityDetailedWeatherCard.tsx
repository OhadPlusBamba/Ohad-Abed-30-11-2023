// src/components/cityDetailedWeatherCard/CityDetailedWeatherCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CityDailyWeatherCard from "../cityDailyWeatherCard/CityDailyWeatherCard";

const CityDetailedWeatherCard: React.FC = () => {
  const { cityName, forecast } = useSelector(
    (state: RootState) => state.weather
  );

  return (
    <Card style={{ width: "80%", margin: "auto", position: "relative" }}>
      <Button style={{ position: "absolute", top: 0, right: 0 }}>
        Favorite
      </Button>

      <CardContent>
        <Typography variant="h4" component="div" style={{ marginBottom: '36px' }}>
          {cityName}
        </Typography>
        <Typography variant="h5" component="div" style={{ marginBottom: '36px' }}>
          Weather Conditions: {forecast.Headline.Text}
        </Typography>
      </CardContent>

      {/* Using Grid for responsive layout */}
      <Grid container spacing={2} justifyContent="space-between">
        {forecast.DailyForecasts.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <CityDailyWeatherCard date={data.Date} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default CityDetailedWeatherCard;
