import { createSlice } from "@reduxjs/toolkit";
import ActIndex from "./Act/ActIndex";
import ActStore from "./Act/ActStore";
import ActShow from "./Act/ActShow";
import ActUpdate from "./Act/ActUpdate";
import ActGetMyReports from "./Act/ActGetMyReports";
import ActDelete from "./Act/ActDelete";

const initialState = {
  data: [],
  myReports: [],
  record: {},
  loading: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    CleanUp: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(ActIndex.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActIndex.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(ActIndex.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // show
    builder.addCase(ActShow.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActShow.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.record = action.payload;
    });
    builder.addCase(ActShow.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    //store
    builder.addCase(ActStore.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActStore.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data.push(action.payload);
    });
    builder.addCase(ActStore.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
     //ActGetMyReports
    builder.addCase(ActGetMyReports.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetMyReports.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.myReports = action.payload;
    });
    builder.addCase(ActGetMyReports.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    //update
    builder.addCase(ActUpdate.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActUpdate.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(ActUpdate.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    //delete
    builder.addCase(ActDelete.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActDelete.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = state.data.filter((el) => {
        if (el.id !== action.payload) return true;
        else return false;
      });
    });
    builder.addCase(ActDelete.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    
   
  },
});
// Action creators are generated for each case reducer function
export { ActIndex, ActShow, ActStore, ActUpdate, ActDelete, ActGetMyReports };
export const { CleanUp } = usersSlice.actions;
export default usersSlice.reducer;
