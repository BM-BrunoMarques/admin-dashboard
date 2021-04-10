import React, { useEffect } from "react";
import Default from "./Default/Default";
import { Route, Switch, useHistory } from "react-router-dom";
import OrdersManagement from "./OrdersManagement/OrdersManagement";

interface MainContentProps {
  classes: any;
  path: string;
  sessionSKey: string;
  currentUrl: string;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
}

const MainContent: React.FC<MainContentProps> = (props) => {
  const { classes, path, setCurrentUrl } = props;

  const handleUrlOnRouting = (path: string) => {
    setCurrentUrl(path);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path={`${path}/default`} component={Default} />
        <Route exact path={`${path}/orders`} component={OrdersManagement} />
      </Switch>
    </main>
  );
};

export default MainContent;
