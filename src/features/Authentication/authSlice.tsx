import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as SI from "../../helpers/consts";
import { initialState as importedInitialState } from "../UserManagement/usersSlice";

const initialState: {
  isAuthenticated: boolean;
  user: SI.UserState;
} = {
  isAuthenticated: false,
  user: importedInitialState.users[0],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedIn, setAuthUser } = authSlice.actions;

export const selectAuthenticated = (state: RootState) => state.auth;

export default authSlice.reducer;
