import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActUpdate = createAsyncThunk(
  "Steps/ActUpdate",
  async ({ data, id }, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/admin/steps/${id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
          params: data,
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
export default ActUpdate;
