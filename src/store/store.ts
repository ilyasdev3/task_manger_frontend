import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import userReducer from "./user/user.slice";
import taskReducer from "./task/task.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
