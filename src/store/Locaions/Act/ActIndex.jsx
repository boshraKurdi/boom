import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActIndex = createAsyncThunk(
  "Locations/ActIndex",
  async (data, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.get(
        `http://localhost:8000/api/locations`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        },
        {
          signal: signal,
        }
      );
      return response.data.locations;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
export default ActIndex;
