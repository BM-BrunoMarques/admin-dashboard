import React, { useEffect } from "react";
import "./App.css";
import { useAppSelector } from "../app/hooks";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";

const App: React.FC = (props) => {
  const isLoggedIn = useAppSelector((state) => state.authenticated);
  const history = useHistory();

  useEffect(() => {
    const path = history.location.pathname;
    if (!isLoggedIn.isAuthenticated) {
      history.push({
        pathname: "/login",
        state: {
          
          // from: this.props.location.pathname,
        },
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  }, [isLoggedIn]);

  const PrivateRoute = ({ children, ...rest }: any) => {
    const history = useHistory();

    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (!isLoggedIn.isAuthenticated) {
            // check for Auth
            history.push({
              pathname: "/login",
              state: {
                from: location.pathname,
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
    if (!isLoggedIn.isAuthenticated) {
      // check for Auth
      history.push({
        pathname: "/login",
      });
    } else {
      if (props) {
        history.push({
          // pathname: props.state,
        });
      } else {
        history.push({
          pathname: "/dashboard",
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <div>
        <Link to="/login">LOGIN</Link> <Link to="/dashboard">DASHBOARD</Link>
      </div>

      <Switch>
        {!isLoggedIn.isAuthenticated ? (
          <Route exact path="/login" component={SignIn} />
        ) : (
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        )}
      </Switch>
    </div>
  );
};

export default App;
