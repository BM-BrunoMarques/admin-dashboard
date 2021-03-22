import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: { isAuthenticated: boolean } = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export const selectAuthenticated = (state: RootState) => state.authenticated;

export default authSlice.reducer;
