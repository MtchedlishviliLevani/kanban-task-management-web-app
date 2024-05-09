import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import boardReducer from "../features/boardSlice";
import switchModeReducer from "../features/switchModeSlice";
import asideReducer from "../features/asideSlice";

const store = configureStore({
  reducer: {
    counterReducer,
    boardReducer,
    switchModeReducer,
    asideReducer,
  },
});

export default store;
export type rootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
