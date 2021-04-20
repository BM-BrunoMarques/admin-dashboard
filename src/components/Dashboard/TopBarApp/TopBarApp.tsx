import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setLoggedIn } from "../../../features/Authentication/authSlice";
import "./topBar.css";
import { eraseCookie } from "../../../helpers/cookie";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from '@material-ui/icons/Brightness5';

interface TopBarProps {
  handleDrawerOpen: any;
  handleDarkMode: () => void;
  open: boolean;
  dark: boolean;
  classes: any;
}

const TopBarApp: React.FC<TopBarProps> = (props) => {
  const { open, handleDrawerOpen, classes, handleDarkMode, dark } = props;
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.user);

  const handleLogOut = () => {
    eraseCookie("isLoggedIn");
    dispatch(setLoggedIn(false));
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {authUser.info.name.firstName} {authUser.info.name.lastName}
        </Typography>

        <div>
          <Button
            className={classes.themeButton}
            color="default"
            variant="contained"
            startIcon={dark ? <Brightness5Icon /> : <Brightness4Icon />}
            onClick={handleDarkMode}
          ></Button>

          <Button
            className={classes.logOutButton}
            color="default"
            variant="contained"
            startIcon={<PowerSettingsNewIcon />}
            onClick={handleLogOut}
          ></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarApp;
