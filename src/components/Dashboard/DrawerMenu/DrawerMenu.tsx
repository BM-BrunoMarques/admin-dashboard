import React, { useContext } from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
}

const DrawerMenu: React.FC<DrawerProps> = (props) => {
  const theme = useTheme();
  const history = useHistory();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dashboardLinks = [
    {
      label: "Dashboard",
      path: "default",
      icon: <InboxIcon />,
    },
    {
      label: "Orders",
      path: "orders",
      icon: <MailIcon />,
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
              onClick={(e) => handleLinkClick(e, path)}
              key={path}
              to={`${url}/${path}`}
            >
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
