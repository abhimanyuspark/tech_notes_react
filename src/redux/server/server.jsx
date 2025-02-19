import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000";

// User api connect

export const getUsers = createAsyncThunk("fetch/users", async () => {
  try {
    const res = await axios.get(`${url}/users`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getSelectedUser = createAsyncThunk(
  "fetch/selectedUser",
  async (id) => {
    try {
      const res = await axios.get(`${url}/users/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postUser = createAsyncThunk("post/user", async (data) => {
  try {
    const res = await axios.post(`${url}/users`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk(
  "delete/user",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/users/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateUser = createAsyncThunk("update/user", async (data) => {
  try {
    const res = await axios.put(`${url}/users`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// notes api connect

export const getNotes = createAsyncThunk("fetch/notes", async () => {
  try {
    const res = await axios.get(`${url}/notes`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getSelectedNote = createAsyncThunk(
  "fetch/selectedNote",
  async (id) => {
    try {
      const res = await axios.get(`${url}/notes/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postNote = createAsyncThunk("post/note", async (data) => {
  try {
    const res = await axios.post(`${url}/notes`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteNote = createAsyncThunk("delete/note", async (id) => {
  try {
    await axios.delete(`${url}/notes/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const updateNote = createAsyncThunk("update/note", async (data) => {
  try {
    const res = await axios.put(`${url}/notes`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
