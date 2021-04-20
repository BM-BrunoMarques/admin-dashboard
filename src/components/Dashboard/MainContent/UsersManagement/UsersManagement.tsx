import React from "react";
import * as SI from "../../../../helpers/consts";
// import AddToTable from "../shared/AddToTable/AddToTable";
import { userColumns } from "./Columns/userColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { deleteUsers } from "../../../../features/UserManagement/usersSlice";
import TableRender from "../utils/TableRender/TableRender";
import OpenContainerAnimated from "../utils/OpenContainerAnimated/OpenContainerAnimated";
import AddUserForm from "./AddUserForm/AddUserForm";

const UsersManagement: React.FC = () => {
  const enhanced = true;
  const dispatch = useAppDispatch();

  const handleDeleteUsers = (id: number[]) => {
    dispatch(deleteUsers(id));
  };

  const allUsers = useAppSelector((state) => state.users.users);
  const columns = userColumns(enhanced, handleDeleteUsers);

  return (
    <>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <OpenContainerAnimated>
          <AddUserForm />
        </OpenContainerAnimated>
        <Paper>
          <TableRender
            parent="usersManagement"
            rows={allUsers}
            columns={columns}
            enhanced
            handleDeleteUsers={handleDeleteUsers}
          />
        </Paper>
      </div>
    </>
  );
};

export default UsersManagement;
