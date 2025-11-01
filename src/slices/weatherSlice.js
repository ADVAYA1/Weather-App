import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, unit }, thunkAPI) => {
    const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const res = await fetch(url);
    const data = await res.json();
    return { city, data };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state[action.payload.city] = action.payload.data;
    });
  },
});

export default weatherSlice.reducer;
