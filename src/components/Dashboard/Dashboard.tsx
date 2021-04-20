import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerMenu from "./DrawerMenu/DrawerMenu";
import TopBarApp from "./TopBarApp/TopBarApp";
import MainContent from "./MainContent/MainContent";
import { useStyles } from "./stylesDashboard";
import { useRouteMatch, useHistory } from "react-router-dom";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const sessionSKey = "currentPageUrl";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dark, setTheme] = useState(false);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState<string>(path);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const theme = createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: dark ? purple : blue,
    },
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

  const handleDarkMode = () => {
    setTheme((prev) => !prev);
  };

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
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <TopBarApp
            handleDrawerOpen={handleDrawerOpen}
            open={open}
            classes={classes}
            dark={dark}
            handleDarkMode={handleDarkMode}
          />

          <DrawerMenu
            handleDrawerClose={handleDrawerClose}
            open={open}
            classes={classes}
            url={url}
            setCurrentUrl={setCurrentUrl}
          />

          <MainContent
            path={path}
            classes={classes}
            sessionSKey={sessionSKey}
            setCurrentUrl={setCurrentUrl}
            currentUrl={currentUrl}
          />
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
