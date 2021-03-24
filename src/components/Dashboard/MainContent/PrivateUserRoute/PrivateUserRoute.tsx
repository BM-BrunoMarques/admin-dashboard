import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { Route } from "react-router-dom";
import * as SI from "../../../../helpers/consts";

const PrivateUserRoute = ({ children, ...rest }: any) => {
  const permissions = useAppSelector(
    (state) => state.auth.user.authentication.type
  );
  const isAdmin = permissions === SI.UserType.ADMIN;

  return (
    <Route
      {...rest}
      render={() => {
        if (!isAdmin) {
          return;
        }
        return children;
      }}
    ></Route>
  );
};

export default PrivateUserRoute;
