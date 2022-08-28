import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  liked?: boolean;
}

const initialState: Movie[] = [
  {
    id: "",
    title: "",
    category: "",
    likes: 0,
    dislikes: 0,
    liked: false,
  },
];

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (_state, action: PayloadAction<Movie[]>) => action.payload,
    deleteMovieById: (state, action: PayloadAction<string>) => {
      return (state = state.filter((movie) => movie.id !== action.payload));
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((movie) => movie.id === action.payload);
      state[index].liked = !state[index].liked;
    },
  },
});

const stateSelector = createSelector(
  ({ movies }: { movies: Movie[] }) => movies,
  (state) => state
);

export const moviesSelectors = {
  getMoviesLength: createSelector(stateSelector, (state) => {
    return state.length;
  }),
  getPaginatedMovies: (firstIndex: number, lastIndex: number) =>
    createSelector(stateSelector, (state) => {
      return state.slice(firstIndex, lastIndex);
    }),
};

export const { actions: moviesActions, reducer: moviesReducer } = moviesSlice;
