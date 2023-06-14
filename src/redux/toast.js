import { createSlice } from "@reduxjs/toolkit";

export const toastReducer = createSlice({
  name: "toast",
  initialState: {
    type: null,
    message: null,
  },
  reducers: {
    setNewNotification: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearOldNotification: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { setNewNotification, clearOldNotification } =
  toastReducer.actions;
export default toastReducer.reducer;
