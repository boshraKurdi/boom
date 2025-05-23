import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActStore = createAsyncThunk(
  "Compaigns/ActStore",
  async (data, thunkAPI, signal) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/compaigns`,
        data,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        },
        {
          signal: signal,
        }
      );
      return response.data.campaign;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
export default ActStore;
