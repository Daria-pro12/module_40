import { createSlice } from '@reduxjs/toolkit';

const tariffSlice = createSlice({
    name: 'tariff',
    initialState: {
        current: localStorage.getItem('currentTariff') || null, 
    },
    reducers: {
        setTariff(state, action) {
            state.current = action.payload;
            localStorage.setItem('currentTariff', action.payload);
        },
        clearTariff(state) {
            state.current = null; 
            localStorage.removeItem('currentTariff'); 
        },
    },
});

export const { setTariff, clearTariff } = tariffSlice.actions;
export default tariffSlice.reducer;
