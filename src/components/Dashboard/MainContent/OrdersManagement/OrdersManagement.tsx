import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import * as SI from "../../../../helpers/consts";
import TableRender from "../shared/TableRender/TableRender";
import { orderColumns } from "../shared/TableRender/orderColumns/orderColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector } from "../../../../app/hooks";

const OrdersManagement: React.FC = (props) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [rowsSliced, setRowsSliced] = useState<SI.OrderState[]>([]);
  const enhanced = true;

  const allOrders = useAppSelector((state) => state.orders);
  const columns = orderColumns(enhanced);

  return (
    <Paper>
      <TableRender
        rows={allOrders}
        columns={columns}
        enhanced
        selected={selected}
        setSelected={setSelected}
        parent="ordersManagement"
      />
    </Paper>
  );
};

export default OrdersManagement;
