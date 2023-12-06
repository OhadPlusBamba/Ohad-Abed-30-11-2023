import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setCurrentCityUserLookingFor } from '../../store/slices/weatherSlice';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { getCurrentConditions } from '../../api/api';

interface FavoriteData {
  id: string;
  name: string;
  currentConditions: {
    temperature: number;
    weatherText: string;
  } | null;
}

function FavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.weather.favorites);

  const [favoriteData, setFavoriteData] = useState<FavoriteData[]>([]);

  useEffect(() => {
    const fetchDataForFavorites = async () => {
      const data: FavoriteData[] = await Promise.all(
        favorites.map(async (favorite) => {
          const { id, name } = favorite;
          try {
            const currentConditionsData = await getCurrentConditions(id);
            return {
              id,
              name,
              currentConditions: {
                temperature: currentConditionsData[0].Temperature.Imperial.Value,
                weatherText: currentConditionsData[0].WeatherText,
              },
            };
          } catch (error) {
            console.error(`Error fetching data for ${id}:`, (error as Error).message);
            return {
              id,
              name,
              currentConditions: null,
            };
          }
        })
      );

      setFavoriteData(data);
    };

    fetchDataForFavorites();
  }, [favorites]);

  const handleFavoriteClick = (cityKey: string, cityName: string) => {
    dispatch(setCurrentCityUserLookingFor({ id: cityKey, name: cityName }));
    navigate('/home');
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" component="div" style={{ marginBottom: '24px', textAlign: 'center', marginTop: '24px' }}>
        Favorite Cities
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {favoriteData.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
            <Button
              fullWidth
              style={{ height: '100%', padding: 0 }}
              onClick={() => handleFavoriteClick(favorite.id, favorite.name)}
            >
              <Card
                style={{
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
                sx={{ '&:hover': { transform: 'scale(1.05)' } }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" style={{ marginBottom: '12px', textAlign: 'center' }}>
                    {favorite.name}
                  </Typography>
                  <Typography variant="h6" component="div" style={{ marginBottom: '12px', textAlign: 'center' }}>
                    Current Temperature: {favorite.currentConditions?.temperature} °F
                  </Typography>
                  <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>
                    Weather Conditions: {favorite.currentConditions?.weatherText || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FavoritesPage;
