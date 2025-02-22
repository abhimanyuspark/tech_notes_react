import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../server/server";

// Fetch all notes
export const getNotes = createAsyncThunk(
  "fetch/notes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes"
      );
    }
  }
);

// Fetch selected note by ID
export const getSelectedNote = createAsyncThunk(
  "fetch/selectedNote",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch note"
      );
    }
  }
);

// Create a new note
export const postNote = createAsyncThunk(
  "post/note",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post(`/notes`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create note"
      );
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "delete/note",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note"
      );
    }
  }
);

// Update a note
export const updateNote = createAsyncThunk(
  "update/note",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.put(`/notes`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update note"
      );
    }
  }
);

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
