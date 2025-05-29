import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
const ActIndex = createAsyncThunk(
  "Reports/ActIndex",
  async (data, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/reports`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
             "Accept-Language": i18next.language,
          },
        },
        {
          signal: signal,
        }
      );
      return response.data.reports;
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
