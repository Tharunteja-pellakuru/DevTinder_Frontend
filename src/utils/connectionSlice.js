import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => actions.payload,
  },
});

export const { addConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
