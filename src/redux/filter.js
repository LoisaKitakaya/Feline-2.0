import { createSlice } from "@reduxjs/toolkit";

export const toggleFilterReducer = createSlice({
  name: "filter",
  initialState: {
    showFilter: false,
  },
  reducers: {
    toggleFilter: (state) => {
      state.showFilter = !state.showFilter;
    },
  },
});

export const { toggleFilter } = toggleFilterReducer.actions;
export default toggleFilterReducer.reducer;
