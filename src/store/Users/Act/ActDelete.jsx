import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
const ActDelete = createAsyncThunk(
  "Steps/ActDelete",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      await axios.delete(
        `http://localhost:8000/api/profile`,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);
export default ActDelete;
