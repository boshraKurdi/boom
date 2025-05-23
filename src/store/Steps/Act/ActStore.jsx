import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActStore = createAsyncThunk(
  "Steps/ActStore",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/steps`,
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
      return response.data.step;
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
