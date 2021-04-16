import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import * as SI from "../../../../helpers/consts";
import TableRender from "../shared/TableRender/TableRender";
import { orderColumns } from "../shared/TableRender/Columns/orderColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { deleteOrders } from "../../../../features/Orders/ordersSlice";

const OrdersManagement: React.FC = (props) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const enhanced = true;
  const dispatch = useAppDispatch();

  const handleDeleteUsers = (id: number[]) => {
    console.log("delete", id);
    dispatch(deleteOrders(id));
  };

  const allOrders = useAppSelector((state) => state.orders);
  const columns = orderColumns(enhanced, handleDeleteUsers);

  return (
    <Paper>
      {/* <AddToTable /> */}
      <TableRender
        rows={allOrders}
        columns={columns}
        enhanced
        handleDeleteUsers={handleDeleteUsers}
        selected={selected}
        setSelected={setSelected}
        parent="ordersManagement"
      />
    </Paper>
  );
};

export default OrdersManagement;
