import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../features/animeSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    animes: animeReducer,
    user: userReducer,
  },
});
