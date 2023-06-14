import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth";
import toastReducer from "./redux/toast";

export default configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
});
