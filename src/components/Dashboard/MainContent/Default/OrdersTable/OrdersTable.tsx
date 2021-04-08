import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { rowStruct, Markers } from "../../../../../helpers/consts";

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

function createOrder(
  id: string,
  name: string,
  date: string,
  address: string,
  country: string,
  total: number,
  status: string
) {
  return { id, name, date, address, country, total, status };
}

const rows = [
  createOrder(
    "000001",
    "Frozen yoghurt",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "Portugal",
    100,
    "Shipped"
  ),
  createOrder(
    "000002",
    "Ice cream sandwich",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
  createOrder(
    "000003",
    "Eclair",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "Portugal",
    100,
    "Shipped"
  ),
  createOrder(
    "000004",
    "Cupcake",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
  createOrder(
    "000005",
    "Gingerbread",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
  createOrder(
    "000006",
    "Frozen yoghurt",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
  createOrder(
    "000007",
    "Ice cream sandwich",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
  createOrder(
    "000008",
    "Eclair",
    "10/10/2212",
    "90731 cherry blossom. CA",
    "United States",
    100,
    "Shipped"
  ),
];

interface OrdersTableProps {
  rowsSliced: rowStruct[];
  setRowsSliced: React.Dispatch<React.SetStateAction<any[]>>;
  setMarkers: React.Dispatch<React.SetStateAction<Markers[]>>;
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { rowsSliced, setRowsSliced, setMarkers } = props;

  useEffect(() => {
    setRowsSliced(
      rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [rowsPerPage]);

  const handleChangePage = (event: unknown, page: number) => {
    setMarkers((prevMark) => (prevMark = []));
    setPage(page);
    setRowsSliced(
      rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const handleChangeRowsPerPage = (e: any) => {
    setMarkers((prevMark) => (prevMark = []));
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  console.log();

  return (
    <Paper>
      <TableContainer className={classes.paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Shipping Address</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage < 0 ? rows : rowsSliced).map((row) => (
              <TableRow key={`${row.id}`}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{`${row.address}, ${row.country}`}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={rows.length}
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
