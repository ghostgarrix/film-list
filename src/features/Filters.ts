import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const OFFSET: number[] = [4, 8, 12];

export interface Filters {
  offset: number;
  currentPage: number;
  selectedCategories: string[];
}

const initialState: Filters = {
  offset: OFFSET[0],
  currentPage: 1,
  selectedCategories: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<Filters>) => action.payload,
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
  },
});

const stateSelector = createSelector(
  ({ filters }: { filters: Filters }) => filters,
  (state) => state
);

export const filtersSelectors = {
  getFilters: createSelector(stateSelector, (state) => {
    return state;
  }),
  getOffset: createSelector(stateSelector, (state) => {
    return state.offset;
  }),
  getCurrentPage: createSelector(stateSelector, (state) => {
    return state.currentPage;
  }),
  getSelectedCategories: createSelector(stateSelector, (state) => {
    return state.selectedCategories;
  }),
};

export const { actions: filtersActions, reducer: filtersReducer } =
  filtersSlice;
