import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import modalSlice from "./slice/modalSlice";
import playlistSlice from "./slice/playlistSlice";

const store = configureStore({
  reducer: {
    playlist: playlistSlice,
    auth: authSlice,
    modal: modalSlice,
  },
});

export default store;
