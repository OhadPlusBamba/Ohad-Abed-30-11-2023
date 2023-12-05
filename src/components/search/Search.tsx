// Search.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import { Container, InputAdornment, TextField, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "../../store/slices/weatherSlice";
import { getLocationsAutocomplete } from "../../api/api";
import { RootState } from "../../store/store";

interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.weather.cityName);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectLocation = (location: Location) => {
    // Dispatch action to update the selected city in the Redux store
    dispatch(setWeather({ cityName: location.LocalizedName, currentTemperature: 0 }));
    // Clear the search term and locations
    setSearchTerm("");
    setLocations([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch data if the search term is not empty
      if (searchTerm.trim() !== "") {
        try {
          const data = await getLocationsAutocomplete(searchTerm);
          setLocations(data);
        } catch (error) {
          // Handle error
          console.error("Error fetching locations:", (error as Error).message);
        }
      } else {
        // Clear locations if the search term is empty
        setLocations([]);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: "100%", maxWidth: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {/* Display the autocomplete results using List and ListItem */}
      <List>
        {locations.map((location) => (
          <ListItem key={location.Key} button onClick={() => handleSelectLocation(location)}>
            <ListItemText
              primary={`${location.LocalizedName}, ${location.Country.LocalizedName}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
