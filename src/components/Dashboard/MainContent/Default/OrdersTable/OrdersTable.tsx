import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { useAppSelector } from "../../../../../app/hooks";
import Checkbox from "@material-ui/core/Checkbox";
import { parentStyles } from "./styles";
import * as SI from "../../../../../helpers/consts";
import EnhancedToolBar from "./EnhancedToolBar";

import Paper from "@material-ui/core/Paper";

type BaseProps = {
  rowsSliced: SI.OrderState[];
  setRowsSliced: React.Dispatch<React.SetStateAction<any[]>>;
  parent: "ordersManagement" | "usersManagement" | "dashboard";
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
  const parentClasses = parentStyles(props.parent)();

  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [SearchText, setSearchText] = useState("");

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
      (SearchText
        ? allOrders.filter((o) =>
            o.name.toLocaleLowerCase().includes(SearchText.toLocaleLowerCase())
          )
        : allOrders
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [rowsPerPage]);

  useEffect(() => {
    setRowsSliced(
      (SearchText
        ? allOrders.filter((o) =>
            o.name.toLocaleLowerCase().includes(SearchText.toLocaleLowerCase())
          )
        : allOrders
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [SearchText]);

  const handleChangePage = (event: unknown, page: number) => {
    if (setMarkers) {
      setMarkers((prevMark) => (prevMark = []));
    }
    setPage(page);
    setRowsSliced(
      (SearchText
        ? allOrders.filter((o) =>
            o.name.toLocaleLowerCase().includes(SearchText.toLocaleLowerCase())
          )
        : allOrders
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        <EnhancedToolBar
          SearchText={SearchText}
          setSearchText={setSearchText}
          numSelected={selected.length}
        />
      )}
      <TableContainer className={parentClasses.paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {enhanced && <TableCell align="right"></TableCell>}
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Shipping Address</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage < 0 && !SearchText ? allOrders : rowsSliced).map(
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
        count={
          SearchText
            ? allOrders.filter((o) =>
                o.name
                  .toLocaleLowerCase()
                  .includes(SearchText.toLocaleLowerCase())
              ).length
            : allOrders.length
        }
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
