// src/store/slices/weatherSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteCity {
  id: string;
  name: string;
  currentConditions: CurrentConditions | null;
}

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

interface CurrentConditions {
  cityKey: string;
  temperature: number;
  weatherText: string;
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
  currentConditions: CurrentConditions | null;
  favorites: FavoriteCity[]; // Add favorites state
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
  currentConditions: null,
  favorites: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<{ cityName: string; currentTemperature: number }>) => {
      state.cityName = action.payload.cityName;
      state.currentTemperature = action.payload.currentTemperature;
    },
    setForecast: (
      state,
      action: PayloadAction<{ Headline: { Text: string }; DailyForecasts: DailyForecast[] }>
    ) => {
      state.forecast = action.payload;
    },
    setCurrentConditions: (
      state,
      action: PayloadAction<{ cityKey: string; temperature: number; weatherText: string }>
    ) => {
      state.currentConditions = action.payload;
    },
    addToFavorites: (
      state,
      action: PayloadAction<{ id: string; name: string; currentConditions: CurrentConditions }>
    ) => {
      console.log('Adding to favorites:', action.payload);

      // Check if the city is already in favorites
      const existingCity = state.favorites.find((city) => city.id === action.payload.id);
    
      if (!existingCity) {
        // Add the city to favorites
        state.favorites.push({
          id: action.payload.id,
          name: action.payload.name,
          currentConditions: action.payload.currentConditions,
        });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      // Remove the city from favorites
      state.favorites = state.favorites.filter((city) => city.id !== action.payload);
    },
  },
});

export const {
  setWeather,
  setForecast,
  setCurrentConditions,
  addToFavorites,
  removeFromFavorites,
} = weatherSlice.actions;
export default weatherSlice.reducer;
