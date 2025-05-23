import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActDelete = createAsyncThunk(
  "Steps/ActDelete",
  async (id, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState();
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/steps/${id}`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        },
        {
          signal: signal,
        }
      );
      return id;
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
