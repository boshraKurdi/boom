import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActAuthLogin = createAsyncThunk(
    'Auth/ActAuthLogin',
    async (data , thunkAPI) => {
        const { rejectWithValue , signal } = thunkAPI;
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/auth/login`, data , {
                signal: signal,
              });
            return response.data   
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);   
            }else{
                return rejectWithValue("An unexpected error")
            }
        }
    },
  )
  export default ActAuthLogin