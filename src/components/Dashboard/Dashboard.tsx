import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerMenu from "./DrawerMenu/DrawerMenu";
import TopBarApp from "./TopBarApp/TopBarApp";
import MainContent from "./MainContent/MainContent";
import { useStyles } from "./stylesDashboard";
import { useRouteMatch, useHistory } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      footer: {
        left: 0,
        bottom: "0",
        zIndex: 2,
        position: "sticky",
      },
    },
  },
});

const sessionSKey = "currentPageUrl";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState<string>(path);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (currentUrl) {
      sessionStorage.setItem(sessionSKey, currentUrl);
    }
  }, [currentUrl]);

  useEffect(() => {
    const pageToRedirect = sessionStorage.getItem(sessionSKey) || "default";

    setRedirect(`${path}/${pageToRedirect}`);
  }, []);

  useEffect(() => {
    history.push(redirect);
  }, [redirect]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        setCurrentUrl={setCurrentUrl}
      />

      <ThemeProvider theme={theme}>
        <MainContent
          path={path}
          classes={classes}
          sessionSKey={sessionSKey}
          setCurrentUrl={setCurrentUrl}
          currentUrl={currentUrl}
        />
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
