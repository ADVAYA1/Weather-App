import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './slices/weatherSlice';
import favoritesReducer from './slices/favoritesSlice';
import unitReducer from './slices/unitSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    unit: unitReducer,
    auth: authReducer,
  },
});
