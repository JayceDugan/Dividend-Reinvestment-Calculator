import { configureStore } from '@reduxjs/toolkit';

import investmentReducer from '@/data-access/features/investmentSlice';

const store = configureStore({
  reducer: {
    investment: investmentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
