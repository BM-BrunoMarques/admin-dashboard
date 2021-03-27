import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../../../app/hooks";
import { setLoggedIn } from "../../../features/Authentication/authSlice";
import "./topBar.css";
import { eraseCookie } from "../../../helpers/cookie";

interface TopBarProps {
  handleDrawerOpen: any;
  open: boolean;
  classes: any;
}

const TopBarApp: React.FC<TopBarProps> = (props) => {
  const { open, handleDrawerOpen, classes } = props;
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    eraseCookie("isLoggedIn");
    dispatch(setLoggedIn(false));
  };

  return (
    <AppBar
      position="fixed"
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
          Mini variant drawer
        </Typography>

        <Button
          color="default"
          variant="contained"
          startIcon={<PowerSettingsNewIcon />}
          onClick={() => handleLogOut()}
        ></Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarApp;
