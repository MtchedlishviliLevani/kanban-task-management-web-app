import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isDarkMode: boolean;
}

const initialState: InitialState = {
  isDarkMode: true,
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { changeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
