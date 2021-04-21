import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../../../app/hooks";
import { setLoggedIn } from "../../../features/Authentication/authSlice";
import "./topBar.css";
import { eraseCookie } from "../../../helpers/cookie";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness5TwoToneIcon from "@material-ui/icons/Brightness5TwoTone";
import Brightness2TwoToneIcon from "@material-ui/icons/Brightness2TwoTone";
import UserAvatar from "../MainContent/utils/UserAvatar/UserAvatar";

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          Admin Dashboard
        </Typography>

        <div>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            size="small"
            onClick={handleDarkMode}
            style={{ border: "1px dotted #000" }}
          >
            {dark ? <Brightness5TwoToneIcon /> : <Brightness2TwoToneIcon />}
          </IconButton>

          <IconButton
            aria-label="delete"
            className={classes.margin}
            size="small"
            onClick={handleClick}
          >
            <UserAvatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem onClick={handleClose}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleLogOut}
                className={classes.button}
                endIcon={<PowerSettingsNewIcon />}
              >
                LogOut
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarApp;
