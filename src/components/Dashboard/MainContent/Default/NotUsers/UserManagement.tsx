import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { UserType } from "../../../../../helpers/consts";
import { deleteUser } from "../../../../../features/UserManagement/usersSlice";
import { useStyles } from "./syles/stylesUserManagement";
import "./syles/styles.css";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
//
import { motion } from "framer-motion";

//
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";

//

const UserManagement: React.FC = () => {
  const classes = useStyles();
  const allUsers = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [flipped, setFlipped] = useState(false);

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

  const handleShowForm = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid item xs={12} md={6} style={{ position: "relative" }}>
          <div className={classes.cardContainer}>
            {!flipped ? (
              <>
                <motion.div
                  animate={{ x: 100 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className={`${classes.demo} ${classes.cardFront}`}
                >
                  <List>
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
                      onClick={() => handleShowForm()}
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
                </motion.div>
              </>
            ) : (
              <>
                <div className={`${classes.demo} cardBack`}>
                  <RegistrationForm
                    handleShowForm={handleShowForm}
                    classes={classes}
                  />
                </div>
              </>
            )}
          </div>
        </Grid>
      </div>
    </>
  );
};

export default UserManagement;
