import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Route, Link, useHistory } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";
import { readCookie } from "../helpers/cookie";
import { setLoggedIn } from "../features/Authentication/authSlice";

const App: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const isLoggedIn = readCookie("isLoggedIn");
  const dispatch = useAppDispatch();

  const PrivateRoute = ({ children, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (!isLoggedIn) {
            history.push({
              pathname: "/login",
              state: {
                from: location,
              },
            });
            return;
          }
          return children;
        }}
      ></Route>
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push({
        pathname: "/login",
      });
    } else {
      history.push({
        pathname: "/dashboard",
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (Boolean(isLoggedIn) !== isAuth) {
      dispatch(setLoggedIn(Boolean(isLoggedIn)));
    }
  }, []);

  return (
    <div className="App">
      <Route exact path="/login" component={SignIn} />
      {isAuth && (
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      )}
      <PrivateRoute path="dashboard" component={Dashboard} />
    </div>
  );
};

export default App;
