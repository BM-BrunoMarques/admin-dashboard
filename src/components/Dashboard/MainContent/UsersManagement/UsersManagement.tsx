import React from "react";
import { userColumns } from "./Columns/userColumns";
import Paper from "@material-ui/core/Paper";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { deleteUsers } from "../../../../features/UserManagement/usersSlice";
import TableRender from "../utils/TableRender/TableRender";
import AddUserForm from "./AddUserForm/AddUserForm";
import ModalForm from "../utils/ModalForm/ModalForm";

const UsersManagement: React.FC = () => {
  const enhanced = true;
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.users.users);
  const authUserId = useAppSelector(
    (state) => state.auth.user.authentication.id
  );

  const handleDeleteUsers = (id: number[]) => {
    if (id.includes(authUserId)) {
      alert(
        "You can't delete your own user. Please authenticate as another Admin"
      );
    } else {
      dispatch(deleteUsers(id));
    }
  };

  const columns = userColumns(enhanced, handleDeleteUsers);

  return (
    <>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <ModalForm>
          <AddUserForm />
        </ModalForm>
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
