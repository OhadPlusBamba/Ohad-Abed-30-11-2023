// src/components/cityDailyWeatherCard/CityDailyWeatherCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface CityDailyWeatherCardProps {
  date: string;
}

const CityDailyWeatherCard: React.FC<CityDailyWeatherCardProps> = ({ date }) => {
  const { forecast } = useSelector((state: RootState) => state.weather);
  const temperature = forecast.DailyForecasts.find(daily => daily.Date === date)?.Temperature.Maximum.Value;

  if (temperature === undefined) {
    // Handle the case where temperature is not available
    return null;
  }

  return (
    <Card style={{ minWidth: "120px", margin: "8px" }}>
      <CardContent>
        <Typography variant="subtitle1">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Typography>
        <Typography variant="h6">{temperature}°C</Typography>
      </CardContent>
    </Card>
  );
};

export default CityDailyWeatherCard;
