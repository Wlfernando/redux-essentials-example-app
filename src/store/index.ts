import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from './counter'
import postReducer from './features/post/postSlice'
import usersReducer from './features/users/usersSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: usersReducer,
  },
});

export default store;

// infer the type of the "store"
export type AppStore = typeof store;

// Infer the "AppDispatch" type from the store itself
export type AppDispatch = typeof store.dispatch

// Same for the "RootState" type
export type RootState = ReturnType<typeof store.getState>
