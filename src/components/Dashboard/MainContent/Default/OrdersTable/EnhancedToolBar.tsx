import React, { useState, useEffect } from "react";

import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface ToolBarProps {
  numSelected: number;
  SearchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const EnhancedToolBar: React.FC<ToolBarProps> = ({
  numSelected,
  SearchText,
  setSearchText,
}) => {
  const classes = useToolbarStyles();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container spacing={1} alignItems="center">
        {numSelected > 0 && (
          <Grid item>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        {numSelected > 0 ? (
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Orders
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleSearch}
            id="input-with-icon-grid"
            label="Search field"
            type="search"
            variant="standard"
            value={SearchText}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default EnhancedToolBar;
