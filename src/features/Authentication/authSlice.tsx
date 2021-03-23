import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: { isAuthenticated: boolean } = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export const selectAuthenticated = (state: RootState) => state.auth;

export default authSlice.reducer;