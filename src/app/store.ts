import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "../features/Movie";
import { paginationReducer } from "../features/Pagination";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
