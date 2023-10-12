import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./redusProfile/profileSlice";

export const store = configureStore({
  reducer: {
    Profile: DataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
