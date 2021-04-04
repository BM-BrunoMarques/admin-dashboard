import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    overflowX: "auto",
    maxHeight: "200px",
  },
});

function createOrder(
  id: string,
  name: string,
  date: string,
  shippingAddress: string,
  total: number,
  status: string
) {
  return { id, name, date, shippingAddress, total, status };
}

const rows = [
  createOrder(
    "000001",
    "Frozen yoghurt",
    "10/10/2212",
    "90731 cherry blossom. CA, USA",
    100,
    "Shipped"
  ),
  createOrder(
    "000002",
    "Ice cream sandwich",
    "10/10/2212",
    "90731 cherry blossom. CA, USA",
    100,
    "Shipped"
  ),
  createOrder(
    "000003",
    "Eclair",
    "10/10/2212",
    "90731 cherry blossom. CA, USA",
    100,
    "Shipped"
  ),
  createOrder(
    "000004",
    "Cupcake",
    "10/10/2212",
    "90731 cherry blossom. CA, USA",
    100,
    "Shipped"
  ),
  createOrder(
    "000005",
    "Gingerbread",
    "10/10/2212",
    "90731 cherry blossom. CA, USA",
    100,
    "Shipped"
  ),
];

const OrdersTable: React.FC = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.shippingAddress}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
