// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import Search from '../../components/search/Search';
import CityDetailedWeatherCard from '../../components/cityDetailedWeatherCard/CityDetailedWeatherCard';
import { useDispatch, useSelector } from 'react-redux';
import { setWeather, setForecast, setCurrentConditions } from '../../store/slices/weatherSlice';
import { getLocationsAutocomplete, get5DayForecast, getCurrentConditions } from '../../api/api';
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

          // Fetch and store the current conditions
          const currentConditionsData = await getCurrentConditions(defaultCityKey);
          dispatch(setCurrentConditions({
            cityKey: defaultCityKey,
            temperature: currentConditionsData[0].Temperature.Imperial.Value,
            weatherText: currentConditionsData[0].WeatherText,
          }));

          // Fetch and store the 5-day forecast
          const defaultCityData = await get5DayForecast(defaultCityKey);
          dispatch(setWeather({ cityName: 'Tokyo', currentTemperature: 0 }));
          dispatch(setForecast({ cityKey: defaultCityKey, ...defaultCityData }));
        } else {
          // Use the first location from autocomplete results
          const selectedLocation = autocompleteData[0];
          dispatch(setWeather({ cityName: selectedLocation.LocalizedName, currentTemperature: 0 }));

          // Fetch and store the 5-day forecast
          const forecastData = await get5DayForecast(selectedLocation.Key);
          dispatch(setForecast(forecastData));

          // Fetch and store the current conditions for the selected location
          const currentConditionsData = await getCurrentConditions(selectedLocation.Key);
          dispatch(setCurrentConditions({
            cityKey: selectedLocation.Key,
            temperature: currentConditionsData[0].Temperature.Imperial.Value,
            weatherText: currentConditionsData[0].WeatherText,
          }));
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
