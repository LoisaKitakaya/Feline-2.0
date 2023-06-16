import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth";
import toastReducer from "./redux/toast";
import darkThemeReducer from "./redux/theme";
import toggleFilterReducer from "./redux/filter";

export default configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    themes: darkThemeReducer,
    filter: toggleFilterReducer,
  },
});
