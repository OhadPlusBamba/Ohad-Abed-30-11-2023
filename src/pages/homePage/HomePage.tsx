// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import Search from '../../components/search/Search';
import CityDetailedWeatherCard from '../../components/cityDetailedWeatherCard/CityDetailedWeatherCard';
import { useDispatch, useSelector } from 'react-redux';
import { setWeather, setForecast } from '../../store/slices/weatherSlice';
import { getLocationsAutocomplete, get5DayForecast } from '../../api/api';
import { RootState } from '../../store/store';

function HomePage() {
  const dispatch = useDispatch();
  const { cityName } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate autocomplete API call
        const autocompleteData = await getLocationsAutocomplete(cityName);

        // Check if autocompleteData is null or undefined or empty
        if (!autocompleteData || autocompleteData.length === 0) {
          // Set a default city (e.g., Tokyo) with its key
          const defaultCityKey = '31868';
          const defaultCityData = await get5DayForecast(defaultCityKey);
          
          // Use the default city data
          dispatch(setWeather({ cityName: 'Tokyo', currentTemperature: 0 }));
          dispatch(setForecast(defaultCityData));
        } else {
          // Use the first location from autocomplete results
          const selectedLocation = autocompleteData[0];
          dispatch(setWeather({ cityName: selectedLocation.LocalizedName, currentTemperature: 0 }));

          // Fetch and store the 5-day forecast
          const forecastData = await get5DayForecast(selectedLocation.Key);
          dispatch(setForecast(forecastData));
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', (error as Error).message);
      }
    };

    fetchData();
  }, [cityName, dispatch]);

  return (
    <div>
      <Search />
      <CityDetailedWeatherCard />
    </div>
  );
}

export default HomePage;
