import { createSlice } from "@reduxjs/toolkit";
import { getNotes, getSelectedNote } from "../server/server";

const initialState = {
  notes: [],
  loading: false,
  error: null,
  selectedNote: {},
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSelectedNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSelectedNote.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNote = action.payload;
      })
      .addCase(getSelectedNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
