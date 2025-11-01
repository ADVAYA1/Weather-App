import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('favorites') || '[]');

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.includes(action.payload)) state.push(action.payload);
    },
    removeFavorite: (state, action) => state.filter(city => city !== action.payload),
    setFavorites: (state, action) => action.payload,
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
