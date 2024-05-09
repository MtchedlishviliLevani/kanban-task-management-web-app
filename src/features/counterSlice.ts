import { createSlice } from "@reduxjs/toolkit";

interface Initial {
  initialState: number;
}

const initialState: Initial = {
  initialState: 3,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.initialState += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
