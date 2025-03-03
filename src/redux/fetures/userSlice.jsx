import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../server/server";

// Fetch all users
export const getUsers = createAsyncThunk(
  "fetch/users",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Fetch selected user by ID
export const getSelectedUser = createAsyncThunk(
  "fetch/selectedUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Create a new user
export const postUser = createAsyncThunk(
  "post/user",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post(`/users`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "delete/user",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const deleteSelectedUsers = createAsyncThunk(
  "deleteSelectedOnes/user",
  async (ids, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await api.delete("/users/delete_multiple", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { ids }, // Important: DELETE requests in Axios need `data`
      });
      return ids;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  "update/user",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.put(`/users`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSelectedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getSelectedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSelectedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (u) => !action.payload.includes(u._id)
        );
      })
      .addCase(deleteSelectedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
