import { createSlice } from "@reduxjs/toolkit";

export const darkThemeReducer = createSlice({
  name: "theme",
  initialState: {
    isDark: localStorage.getItem("isDark")
      ? localStorage.getItem("isDark")
      : false,
  },
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem("isDark", !state.isDark);
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = darkThemeReducer.actions;
export default darkThemeReducer.reducer;
