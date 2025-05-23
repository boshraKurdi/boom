import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ActShow = createAsyncThunk(
    'Compaigns/ActShow',
    async (id , thunkAPI) => {
        const { rejectWithValue , getState , signal} = thunkAPI;
        const { auth } = getState()
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/compaigns/${id}` , {
                signal: signal,
              }, {
                headers: {
                  Authorization: 'Bearer ' + auth.token
              }
              });
            return response.data.campaign  
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