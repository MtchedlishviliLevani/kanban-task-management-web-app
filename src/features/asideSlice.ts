import { createSlice } from "@reduxjs/toolkit";

interface Initial {
  isOpenSide: boolean;
}

const initialState: Initial = {
  isOpenSide: true,
};

const asideSlice = createSlice({
  name: "aside",
  initialState,
  reducers: {
    hideAside: (state) => {
      state.isOpenSide = !state.isOpenSide;
    },
  },
});

export const { hideAside } = asideSlice.actions;
export default asideSlice.reducer;
