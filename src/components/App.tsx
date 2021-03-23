import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppSelector } from "../app/hooks";
import { Route, Link, useHistory } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";
import { readCookie } from "../helpers/cookie";

const App: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const history = useHistory();
  const isLoggedIn = readCookie("isLoggedIn");

  const PrivateRoute = ({ children, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (!auth.isAuthenticated && !isLoggedIn) {
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
    if (!auth.isAuthenticated && !isLoggedIn) {
      history.push({
        pathname: "/login",
      });
    } else {
      history.push({
        pathname: "/dashboard",
      });
    }
  }, [auth]);

  return (
    <div className="App">
      <div>
        <Link to="/login">LOGIN</Link> <Link to="/dashboard">DASHBOARD</Link>
      </div>

      <Route exact path="/login" component={SignIn} />
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="dashboard" component={Dashboard} />
    </div>
  );
};

export default App;
