import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
const ActUpdate = createAsyncThunk(
  "Teams/ActUpdate",
  async ({ data, id }, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/RegerterInTeam?team_id=${id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
            "Accept-Language": i18next.language, 
          },
          params: data,
          signal: signal,
        }
      );
      return response.data;
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
