import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3000";

export const loginAuth = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/auth`, data, {
        withCredentials: true, // ✅ Ensure cookies are stored
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const refreshAuth = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/auth/refresh`, {
        withCredentials: true, // ✅ Ensure cookies are included
      });

      return res.data; // Expecting { accessToken: "newToken" }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);

export const logOutAuth = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/auth/logout`);
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  // auth: {},
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
  },
  extraReducers: (builder) => {
    builder

      // login

      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.accessToken;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // refresh

      .addCase(refreshAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.accessToken;
      })
      .addCase(refreshAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout

      .addCase(logOutAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(logOutAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
