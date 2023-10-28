import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./redusProfile/profileSlice";
export const loadState = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
export const store = configureStore({
  reducer: {
    Profile: DataSlice,
  },
  preloadedState: {
    Profile: {
      auth_status: loadState(),
      profile: {},
    },

  }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
