import React from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { Route, useHistory } from "react-router-dom";
import * as SI from "../../../../../helpers/consts";

interface PrivateRouteProps {
  path: string;
}

const PrivateUserRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const history = useHistory();
  const permissions = useAppSelector(
    (state) => state.auth.user.authentication.type
  );
  const isAdmin = permissions === SI.UserType.ADMIN;

  return (
    <Route
      exact
      {...rest}
      render={() => {
        if (!isAdmin) {
          history.push('/dashboard/default')
        }
        return children;
      }}
    ></Route>
  );
};

export default PrivateUserRoute;
