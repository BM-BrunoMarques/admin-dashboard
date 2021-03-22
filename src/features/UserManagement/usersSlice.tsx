import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import * as SI from "../../helpers/consts";

const initialState: Array<SI.UserState> = [
  {
    id: 1,
    authentication: {
      type: SI.UserType.ADMIN,
      email: "user@example.com",
      password: "helloworld",
    },
    info: {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
    },
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUser: (state, action) => {
      // state[0].id = 12;
    },
  },
});

export const { getUser } = usersSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.users;

export default usersSlice.reducer;
