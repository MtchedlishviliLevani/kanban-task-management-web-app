import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./assets/features/counter/counterSlice";
import themeModeReducer from "./assets/features/theme/themeModeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    changeTheme: themeModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
