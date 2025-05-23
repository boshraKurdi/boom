import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActShow = createAsyncThunk(
    'Compaigns/ActShow',
    async (data , thunkAPI) => {
        const { rejectWithValue , getState , signal} = thunkAPI;
        const { auth } = getState()
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/auth/logout` , {
                signal: signal,
              }, {
                headers: {
                  Authorization: 'Bearer ' + auth.token
              }
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
  export default ActShow