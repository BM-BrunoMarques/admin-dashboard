import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as SI from "../../helpers/consts";
import { generateOrder } from "../../helpers/helpers";

export const initialState: SI.OrderStateObj = {
  orders: [
    generateOrder(
      "Frozen yoghurt",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "Portugal",
      100,
      "Shipped"
    ),
    generateOrder(
      "Ice cream sandwich",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "United States",
      100,
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "France",
      100,
      "Shipped"
    ),
    generateOrder(
      "Cupcake",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "United States",
      100,
      "Shipped"
    ),
    generateOrder(
      "Gingerbread",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "United States",
      100,
      "Shipped"
    ),
    generateOrder(
      "Frozen yoghurt",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "France",
      100,
      "Shipped"
    ),
    generateOrder(
      "Ice cream sandwich",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "Russia",
      100,
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "Russia",
      100,
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "China",
      100,
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "10/10/2212",
      "90731 cherry blossom. CA",
      "China",
      100,
      "Shipped"
    ),
  ],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    deleteOrders: (state, action) => {
      action.payload.map((o: number) => {
        state.orders = state.orders.filter((order) =>
          !action.payload.includes(order.id)
        );
      });
    },
  },
});

export const { createOrder, deleteOrders } = ordersSlice.actions;

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
export const selectCount = (state: RootState) => state.orders;

export default ordersSlice.reducer;
