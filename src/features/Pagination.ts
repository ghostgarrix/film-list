import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const OFFSET: number[] = [4, 8, 12];

export interface Pagination {
  offset: number;
  currentPage: number;
}

const initialState: Pagination = {
  offset: OFFSET[0],
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (_state, action: PayloadAction<Pagination>) =>
      action.payload,
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

const stateSelector = createSelector(
  ({ pagination }: { pagination: Pagination }) => pagination,
  (state) => state
);

export const paginationSelectors = {
  getPagination: createSelector(stateSelector, (state) => {
    return state;
  }),
  getOffset: createSelector(stateSelector, (state) => {
    return state.offset;
  }),
  getCurrentPage: createSelector(stateSelector, (state) => {
    return state.currentPage;
  }),
};

export const { actions: paginationActions, reducer: paginationReducer } =
  paginationSlice;
