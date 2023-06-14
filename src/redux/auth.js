import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isLoggedIn: localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : false,
  },
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isLoggedIn", true);

      state.token = localStorage.getItem("token");
      state.isLoggedIn = localStorage.getItem("isLoggedIn");
    },
    signOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut } = authReducer.actions;
export default authReducer.reducer;
