import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const counterSlice = createSlice({
    name: 'timer',
    initialState: { value: null },
    reducers: {
        increment: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { increment } = counterSlice.actions;


export default counterSlice.reducer;

export const selectCount = (state: RootState) => state.timer.value;
