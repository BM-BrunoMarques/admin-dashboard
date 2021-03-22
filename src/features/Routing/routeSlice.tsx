import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: { toLocation: string } = {
  toLocation: "",
};

export const authSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.toLocation = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export const selectAuthenticated = (state: RootState) => state.authenticated;

export default authSlice.reducer;
