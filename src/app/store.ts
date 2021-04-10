import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/UserManagement/usersSlice';
import ordersReducer from '../features/Orders/ordersSlice';
import authReducer from '../features/Authentication/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;