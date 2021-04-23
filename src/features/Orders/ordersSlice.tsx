import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as SI from "../../helpers/consts";
import { generateOrder } from "../../helpers/helpers";

export const initialState: SI.OrderStateObj = {
  orders: [
    generateOrder(
      "Pastel de Nata",
      "Avenida da Liberdade, Lisbon",
      {
        name: "Portugal",
        code: "PT",
      },
      "$63.99",
      "Shipped"
    ),
    generateOrder(
      "Queijo da Ilha",
      "Rua Augusta, Lisbon",
      {
        name: "Portugal",
        code: "PT",
      },
      "$499.99",
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "Avenue de L'Opéra, Paris",
      {
        name: "France",
        code: "FR",
      },
      "$129.99",
      "Shipped"
    ),
    generateOrder(
      "American Pie",
      "90731 cherry blossom. CA",
      {
        name: "United States",
        code: "US",
      },
      "$49.99",
      "Shipped"
    ),
    generateOrder(
      "Gingerbread",
      "90731 cherry blossom. CA",
      {
        name: "United States",
        code: "US",
      },
      "$129.99",
      "Shipped"
    ),
    generateOrder(
      "Baguette",
      "Rue Montorgueil, Paris",
      {
        name: "France",
        code: "FR",
      },
      "$88.49",
      "Shipped"
    ),
    generateOrder(
      "Ice cream sandwich",
      "Sovetskaya Street",
      {
        name: "Russia",
        code: "RU",
      },
      "$129.99",
      "Shipped"
    ),
    generateOrder(
      "Picanha steak",
      "Sao Paulo",
      {
        name: "Brazil",
        code: "BR",
      },
      "$300.00",
      "Shipped"
    ),
    generateOrder(
      "Eclair",
      "Zhongshan , Chungshan",
      {
        name: "China",
        code: "CN",
      },
      "$49.99",
      "Shipped"
    ),
    generateOrder(
      "Fruit Cake",
      "Chungshan, Jhongsha",
      {
        name: "China",
        code: "CN",
      },
      "$229.99",
      "Shipped"
    ),
  ],
};

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const { name, address, country, total, status } = action.payload;

      const price = formatter.format(total);
      const order = generateOrder(name, address, country, price, status);
      state.orders.unshift(order);
    },
    deleteOrders: (state, action) => {
      state.orders = state.orders.filter(
        (order) => !action.payload.includes(order.id)
      );
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
