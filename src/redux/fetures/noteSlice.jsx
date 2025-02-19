import { createSlice } from "@reduxjs/toolkit";
import { deleteNote, getNotes, getSelectedNote } from "../server/server";

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
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSelectedNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedNote.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNote = action.payload;
      })
      .addCase(getSelectedNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((n) => n._id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
