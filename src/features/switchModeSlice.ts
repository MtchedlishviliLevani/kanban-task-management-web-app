import { createSlice } from "@reduxjs/toolkit";

interface Initial {
  isDarkMode: boolean;
}

const initialState: Initial = {
  isDarkMode: false,
};

const switchModeSlice = createSlice({
  name: "switcherMode",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { changeMode } = switchModeSlice.actions;
export default switchModeSlice.reducer;
