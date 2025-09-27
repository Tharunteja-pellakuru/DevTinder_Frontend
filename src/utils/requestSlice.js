import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) =>
      state.filter((req) => req._id !== action.payload),
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
