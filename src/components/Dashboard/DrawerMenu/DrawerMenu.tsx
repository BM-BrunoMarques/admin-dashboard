import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

//icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

interface DrawerProps {
  handleDrawerClose: () => void;
  open: boolean;
  classes: any;
  url: string;
}

const DrawerMenu: React.FC<DrawerProps> = (props) => {
  const theme = useTheme();

  const dashboardLinks = [
    {
      label: "Dashboard",
      path: "default",
      icon: <InboxIcon />,
    },
    {
      label: "Forms",
      path: "forms",
      icon: <MailIcon />,
    },
    {
      label: "Dashboard",
      path: "default",
      icon: <InboxIcon />,
    },
    {
      label: "Forms",
      path: "forms",
      icon: <MailIcon />,
    },
  ];

  const { open, handleDrawerClose, classes, url } = props;
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
            <Link key={path} to={`${url}/${path}`}>
              <ListItem button key={label}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
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
