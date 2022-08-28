import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "../features/Filters";
import { moviesReducer } from "../features/Movie";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
