import { createSlice } from "@reduxjs/toolkit";
import { loginAuth, logOutAuth, refreshAuth } from "../server/server";

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
