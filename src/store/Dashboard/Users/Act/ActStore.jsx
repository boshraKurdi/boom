import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
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
             "Accept-Language": i18next.language,
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
