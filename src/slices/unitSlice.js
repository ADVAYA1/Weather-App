import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('unit') || 'celsius';

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    toggleUnit: (state) => (state === 'celsius' ? 'fahrenheit' : 'celsius'),
    setUnit: (state, action) => action.payload,
  },
});

export const { toggleUnit, setUnit } = unitSlice.actions;
export default unitSlice.reducer;
