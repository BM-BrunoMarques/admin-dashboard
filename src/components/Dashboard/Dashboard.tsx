import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerMenu from "./DrawerMenu/DrawerMenu";
import TopBarApp from "./TopBarApp/TopBarApp";
import MainContent from "./MainContent/MainContent";
import { useStyles } from "./stylesDashboard";
import {useRouteMatch } from "react-router-dom";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { path, url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <TopBarApp
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        classes={classes}
      />

      <DrawerMenu
        handleDrawerClose={handleDrawerClose}
        open={open}
        classes={classes}
        url={url}
      />

      <MainContent path={path} classes={classes} />
    </div>
  );
};

export default Dashboard;
