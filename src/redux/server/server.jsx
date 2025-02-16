import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000";

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
