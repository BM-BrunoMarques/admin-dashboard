import React from "react";
import { orderColumns } from "./Columns/orderColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { deleteOrders } from "../../../../features/Orders/ordersSlice";
import TableRender from "../utils/TableRender/TableRender";
import AddOrderForm from "./AddOrderForm/AddOrderForm";
import ModalForm from "../utils/ModalForm/ModalForm";

const OrdersManagement: React.FC = () => {
  const enhanced = true;
  const dispatch = useAppDispatch();

  const handleDeleteUsers = (id: number[]) => {
    dispatch(deleteOrders(id));
  };

  const allOrders = useAppSelector((state) => state.orders);

  const columns = orderColumns(enhanced, handleDeleteUsers);

  return (
    <>
      <ModalForm>
        <AddOrderForm />
      </ModalForm>

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
