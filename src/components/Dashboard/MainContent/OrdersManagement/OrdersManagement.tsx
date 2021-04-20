import React from "react";
import * as SI from "../../../../helpers/consts";
// import AddToTable from "../shared/AddToTable/AddToTable";
import { orderColumns } from "./Columns/orderColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { deleteOrders } from "../../../../features/Orders/ordersSlice";
import TableRender from "../utils/TableRender/TableRender";
import OpenContainerAnimated from "../utils/OpenContainerAnimated/OpenContainerAnimated";
import AddOrderForm from "./AddOrderForm/AddOrderForm";

const OrdersManagement: React.FC = (props) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const enhanced = true;
  const dispatch = useAppDispatch();

  const handleDeleteUsers = (id: number[]) => {
    dispatch(deleteOrders(id));
  };

  const allOrders = useAppSelector((state) => state.orders);
  const columns = orderColumns(enhanced, handleDeleteUsers);

  return (
    <>
      <OpenContainerAnimated>
        <AddOrderForm />
      </OpenContainerAnimated>
      <Paper>
        <TableRender
          rows={allOrders.orders}
          columns={columns}
          enhanced
          handleDeleteUsers={handleDeleteUsers}
          parent="ordersManagement"
        />
      </Paper>
    </>
  );
};

export default OrdersManagement;
