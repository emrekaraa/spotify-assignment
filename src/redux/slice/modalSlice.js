import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  deletedTrack: {
    id: "",
    name: "",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    setDeletedTrack: (state, action) => {
      state.deletedTrack = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
  },
});

export const { setModalOpen, setDeletedTrack } = modalSlice.actions;

export default modalSlice.reducer;
