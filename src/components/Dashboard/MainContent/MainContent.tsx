import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Default from "./Default/Default";
import Forms from "./Forms/Forms";

interface MainContentProps {
  classes: any;
  path: string;
}

const MainContent: React.FC<MainContentProps> = (props) => {
  const history = useHistory();
  const { classes, path } = props;

  useEffect(() => {
    // check for Auth
    history.push({
      pathname: `${path}/default`,
    });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path={`${path}/default`} component={Default} />
        <Route exact path={`${path}/forms`} component={Forms} />
      </Switch>
    </main>
  );
};

export default MainContent;
