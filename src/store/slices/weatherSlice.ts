// src/store/slices/weatherSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DailyForecast {
    Date: string;
    Temperature: {
      Maximum: {
        Value: number;
      };
      Minimum: {
        Value: number;
      };
    };
  }
  

  interface WeatherState {
    cityName: string;
    currentTemperature: number;
    forecast: {
      Headline: {
        Text: string;
      };
      DailyForecasts: DailyForecast[];
    };
  }

  const initialState: WeatherState = {
    cityName: '',
    currentTemperature: 0,
    forecast: {
      Headline: {
        Text: '',
      },
      DailyForecasts: [],
    },
  };
  
  const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      setWeather: (state, action: PayloadAction<{ cityName: string; currentTemperature: number }>) => {
        state.cityName = action.payload.cityName;
        state.currentTemperature = action.payload.currentTemperature;
        // return {...state, cityName:  action.payload.cityName, }
      },
      setForecast: (state, action: PayloadAction<{ Headline: { Text: string }; DailyForecasts: DailyForecast[] }>) => {
        state.forecast = action.payload;
      },
    },
  });

export const { setWeather, setForecast } = weatherSlice.actions;
export default weatherSlice.reducer;
