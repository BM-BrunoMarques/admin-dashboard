import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { UserType } from "../../../../../helpers/consts";
import { deleteUser } from "../../../../../features/UserManagement/usersSlice";
//
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const UserManagement: React.FC = () => {
  const classes = useStyles();
  const allUsers = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [showUserForm, setUserForm] = useState<boolean>(false);

  interface name {
    firstName: string;
    lastName: string;
  }
  interface auth {
    type: number;
    id: number;
  }

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };
  const handleAddUser = () => {
    setUserForm(!showUserForm);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            {!showUserForm && (
              <>
                <List style={{ height: "400px", overflowY: "auto" }}>
                  {allUsers.map((user) => {
                    if (!user?.info?.name || !user?.authentication) {
                      throw Error();
                    }

                    const { firstName, lastName }: name = user?.info?.name;
                    const { type, id }: auth = user?.authentication;

                    return (
                      <ListItem key={id}>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${firstName} ${lastName}`}
                          secondary={UserType[type]}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteUser(id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Add />}
                    onClick={() => handleAddUser()}
                  >
                    Add User
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete All
                  </Button>
                </div>
              </>
            )}
            {showUserForm && (
              <>
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={<Close />}
                  onClick={() => handleAddUser()}
                />
                <Typography variant="h6" className={classes.title}>
                  User Registration Form
                </Typography>
              </>
            )}
          </div>
        </Grid>
      </div>
    </>
  );
};

export default UserManagement;
