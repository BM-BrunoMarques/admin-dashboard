import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import clsx from "clsx";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { useAppSelector } from "../../../../../app/hooks";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import * as SI from "../../../../../helpers/consts";

import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    maxHeight: "400px",
    overflowX: "auto",
  },
  tableWrap: {
    height: "200px",
    border: "2px solid black",
    overflow: "auto",
  },
});

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
const EnhancedTableToolbar: React.FC<ToolBarProps> = ({
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

type BaseProps = {
  rowsSliced: SI.OrderState[];
  setRowsSliced: React.Dispatch<React.SetStateAction<any[]>>;
};

type EnhancedProps = {
  enhanced: true;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setMarkers?: never;
};

type UnenhancedProps = {
  enhanced: false;
  setMarkers: React.Dispatch<React.SetStateAction<SI.Markers[]>>;
  selected?: never;
  setSelected?: never;
};

type OrderTableProps = BaseProps & (EnhancedProps | UnenhancedProps);

const OrdersTable: React.FC<OrderTableProps> = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [SearchText, setSearchText] = useState("");
  const [searchRows, setSearchRows] = useState<SI.OrderState[]>([]);

  const allOrders = useAppSelector((state) => state.orders);

  const {
    rowsSliced,
    setRowsSliced,
    setMarkers,
    enhanced,
    selected = [],
    setSelected,
  } = props;

  useEffect(() => {
    setRowsSliced(
      allOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [rowsPerPage]);

  useEffect(() => {
    //search here
  }, [SearchText]);

  const handleChangePage = (event: unknown, page: number) => {
    if (setMarkers) {
      setMarkers((prevMark) => (prevMark = []));
    }
    setPage(page);
    setRowsSliced(
      allOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const handleChangeRowsPerPage = (e: any) => {
    if (setMarkers) {
      setMarkers((prevMark) => (prevMark = []));
    }
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (setSelected) {
      console.log("checkbox :", e);
      if (e.target.checked) {
        setSelected((prevState) => prevState.concat(id.toString()));
      } else {
        setSelected((prevState) =>
          prevState.filter((row) => row !== id.toString())
        );
      }
    }
  };

  return (
    <Paper>
      {enhanced && (
        <EnhancedTableToolbar
          SearchText={SearchText}
          setSearchText={setSearchText}
          numSelected={selected.length}
        />
      )}
      <TableContainer className={classes.paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Shipping Address</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(searchRows || rowsPerPage < 0 ? allOrders : rowsSliced).map(
              (row) => (
                <TableRow key={`${row.id}`}>
                  {enhanced && (
                    <TableCell padding="checkbox">
                      <Checkbox onChange={(e) => handleCheckBox(e, row.id)} />
                    </TableCell>
                  )}
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{`${row.address}, ${row.country}`}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={allOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrdersTable;
