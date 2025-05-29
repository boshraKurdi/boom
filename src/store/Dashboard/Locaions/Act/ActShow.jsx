import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";
const ActShow = createAsyncThunk(
    'Locations/ActShow',
    async (id , thunkAPI) => {
        const { rejectWithValue , getState , signal} = thunkAPI;
        const { auth } = getState()
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/locations/${id}` ,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
             "Accept-Language": i18next.language,
          },
        },
        {
          signal: signal,
        });
            return response.data.location   
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