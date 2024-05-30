import { createSlice } from "@reduxjs/toolkit";

interface Initial {
  isOpenSide: boolean;
}

const initialState: Initial = {
  isOpenSide: false,
};

const asideSlice = createSlice({
  name: "aside",
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.isOpenSide = !state.isOpenSide;
    },
    hideAside: (state) => {
      state.isOpenSide = false;
    },
  },
});

export const { toggleAside, hideAside } = asideSlice.actions;
export default asideSlice.reducer;
