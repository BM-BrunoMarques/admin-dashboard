import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";

const PrivateRoute = ({ children, ...rest }: any) => {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (false) {
          // check for Auth
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

const App: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (false) {
      // check for Auth
      history.push({
        pathname: "/login",
      });
    }
  }, []);

  return (
    <div className="App">
      <div>
        <Link to="/login">LOGIN</Link> <Link to="/dashboard">DASHBOARD</Link>
      </div>

      <Switch>
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default App;
