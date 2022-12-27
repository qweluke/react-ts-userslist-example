import { configureStore } from '@reduxjs/toolkit';
import { USERS_FEATURE_KEY, usersReducer } from './users.slice';

export const storeConfig = {
  reducer: {
    [USERS_FEATURE_KEY]: usersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
};

export const store = configureStore(storeConfig);

// Infer the `RootState` and `AppDispatch` interfaces from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
