// FavoritesPage.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromFavorites } from '../../store/slices/weatherSlice';
import { Card, CardContent, Typography, Button } from '@mui/material';

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const currentConditions = useSelector((state: RootState) => state.weather.currentConditions);

  useEffect(() => {
    // You can perform any additional actions when the favorites state changes
    console.log('Favorites have changed:', favorites);
  }, [favorites]);

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <div>
      <Typography variant="h4" component="div" style={{ marginBottom: '24px', textAlign: 'center' }}>
        Favorite Cities
      </Typography>
      {favorites.map((favorite) => (
        <Card key={favorite.id} style={{ width: '80%', margin: 'auto', marginBottom: '24px' }}>
          <Button
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => handleRemoveFavorite(favorite.id)}
          >
            Remove from Favorites
          </Button>
          <CardContent>
            <Typography variant="h4" component="div" style={{ marginBottom: '12px' }}>
              {favorite.name}
            </Typography>
            <Typography variant="h6" component="div" style={{ marginBottom: '12px' }}>
              Current Temperature: {currentConditions?.temperature} °F
            </Typography>
            <Typography variant="h5" component="div">
              Weather Conditions: {currentConditions?.weatherText || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FavoritesPage;
