import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
const ActStore = createAsyncThunk(
  "Donations/ActStore",
  async (data, thunkAPI, signal) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/donations`,
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
      return response.data.donation;
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
