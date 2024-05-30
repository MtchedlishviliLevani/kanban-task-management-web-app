import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import switchModeReducer from "../features/switchModeSlice";
import asideReducer from "../features/asideSlice";
import modalReducer from "../features/modalSlice";

const store = configureStore({
  reducer: {
    boardReducer,
    switchModeReducer,
    asideReducer,
    modalReducer,
  },
});

export default store;
export type rootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
