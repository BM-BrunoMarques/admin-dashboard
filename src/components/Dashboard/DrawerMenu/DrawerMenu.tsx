import React, { useContext } from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

//icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

interface DrawerProps {
  handleDrawerClose: () => void;
  open: boolean;
  classes: any;
  url: string;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
}

const DrawerMenu: React.FC<DrawerProps> = (props) => {
  const theme = useTheme();
  const history = useHistory();

  const BiggerListItemIcon = withStyles({
    root: {
      "& .MuiSvgIcon-root": { fontSize: "2.7em" },
    },
  })(ListItemIcon);

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dashboardLinks = [
    {
      label: "Dashboard",
      path: "default",
      icon: <DashboardIcon />,
    },
    {
      label: "Orders",
      path: "orders",
      icon: <MonetizationOnIcon />,
    },
    {
      label: "Users",
      path: "users",
      icon: <PeopleAltIcon />,
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    setCurrentUrl(path);
    history.push(`${url}/${path}`);
  };

  const { open, handleDrawerClose, classes, url, setCurrentUrl } = props;
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      style={{
        width: isSmall && !open ? "0" : "",
        opacity: isSmall && !open ? "0" : "1",
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {dashboardLinks.map((link, index) => {
          const { label, path, icon } = link;
          return (
            <Link
              color="inherit"
              onClick={(e) => handleLinkClick(e, path)}
              key={path}
              to={`${url}/${path}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem button key={label}>
                <ListItemIcon>
                  <BiggerListItemIcon>{icon}</BiggerListItemIcon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      color="primary"
                      style={{ fontSize: "1.4rem" }}
                    >
                      {label}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerMenu;
