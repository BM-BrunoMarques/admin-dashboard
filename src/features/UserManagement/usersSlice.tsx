import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { generateUser } from "../../helpers/helpers";
import * as SI from "../../helpers/consts";

export const initialState: SI.UsersStateObj = {
  users: [
    generateUser(
      {
        authentication: {
          type: SI.UserType.ADMIN,
          email: "user@example.com",
          password: "helloworld",
        },
      },
      {
        info: {
          name: {
            firstName: "John",
            lastName: "Doe",
          },
        },
      }
    ),
    generateUser(
      {
        authentication: {
          type: SI.UserType.USER,
          email: "user2@example.com",
          password: "helloworld",
        },
      },
      {
        info: {
          name: {
            firstName: "Anna",
            lastName: "Simpson",
          },
        },
      }
    ),
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUsers: (state, action) => {
      state.users = state.users.filter(
        (order) => !action.payload.includes(order.authentication.id)
      );
    },
    createUser: (state, action) => {
      const { firstName, lastName, type, email, password } = action.payload;
      const authentication = {
        type,
        email,
        password,
      };
      const info = {
        name: {
          firstName,
          lastName,
        },
      };

      const user = generateUser({ authentication }, { info });

      state.users.push(user);
    },
  },
});

export const { createUser, deleteUsers } = usersSlice.actions;

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
export const selectCount = (state: RootState) => state.users.users;

export default usersSlice.reducer;
