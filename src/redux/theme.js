import { createSlice } from "@reduxjs/toolkit";

export const darkThemeReducer = createSlice({
  name: "theme",
  initialState: {
    isDark: localStorage.getItem("isDark")
      ? localStorage.getItem("isDark")
      : false,
  },
  reducers: {
    toggleDark: (state) => {
      localStorage.setItem("isDark", true);
      state.isDark = localStorage.getItem("isDark");
    },
    toggleLight: (state) => {
      localStorage.setItem("isDark", false);
      state.isDark = localStorage.getItem("isDark");
    },
  },
});

export const { toggleDark, toggleLight } = darkThemeReducer.actions;
export default darkThemeReducer.reducer;
