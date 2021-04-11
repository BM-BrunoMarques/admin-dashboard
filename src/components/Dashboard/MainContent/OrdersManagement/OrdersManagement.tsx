import React, { useState, useEffect } from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import * as SI from "../../../../helpers/consts";
import OrdersTable from "../Default/OrdersTable/OrdersTable";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";

import Paper from "@material-ui/core/Paper";

const OrdersManagement: React.FC = (props) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [rowsSliced, setRowsSliced] = useState<SI.OrderState[]>([]);

  const theme = {
    paper: {
      maxHeight: "1000px",
    },
  };

  return (
    <Paper>
      <ThemeProvider theme={theme}>
        <OrdersTable
          rowsSliced={rowsSliced}
          setRowsSliced={setRowsSliced}
          enhanced={true}
          selected={selected}
          setSelected={setSelected}
          parent='ordersManagement'
        />
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      </ThemeProvider>
    </Paper>
  );
};

export default OrdersManagement;
