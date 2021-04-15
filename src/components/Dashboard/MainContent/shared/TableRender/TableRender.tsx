import React, { useState, useEffect } from "react";

import * as SI from "../../../../../helpers/consts";
import Paper from "@material-ui/core/Paper";
import DataTable from "react-data-table-component";
import EnhancedToolBar from "./EnhancedToolBar/EnhancedToolBar";
import Checkbox from "@material-ui/core/Checkbox";
import SearchInput from "./SearchInput/SearchInput";

import "./table.css";

type BaseProps = {
  parent: "ordersManagement" | "usersManagement" | "dashboard";
  rows: SI.OrderState[];
  columns?: any;
};

type EnhancedProps = {
  enhanced: true;
  setVisibleRows?: never;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

type UnenhancedProps = {
  enhanced: false;
  setVisibleRows: React.Dispatch<React.SetStateAction<SI.OrderState[]>>;
  selected?: never;
  setSelected?: never;
};

type OrderTableProps = BaseProps & (EnhancedProps | UnenhancedProps);

const TableRender: React.FC<OrderTableProps> = (props) => {
  const { enhanced, parent, rows, columns } = props;
  const setVisibleRows = props.setVisibleRows;

  const [enhancedRows, setEnhancedRows] = useState<SI.OrderState[]>([]);
  const [selectedRows, setSelectedRows] = useState<SI.OrderState[]>([]);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (setVisibleRows) {
      setVisibleRows(
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
      setEnhancedRows(rows);
    }
  }, []);

  useEffect(() => {
    if (setVisibleRows) {
      setVisibleRows(
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [rowsPerPage, page]);

  interface selectedRowsState {
    selectedRows: SI.OrderState[];
  }

  const handleSelectedRows = (state: selectedRowsState) => {
    setSelectedRows(selectedRows);
  };

  return (
    <Paper
      style={{ position: "relative" }}
      className={enhanced ? `enchanced ${parent}` : parent}
    >
      {enhanced && (
        <SearchInput rows={rows} setEnhancedRows={setEnhancedRows} />
      )}
      <DataTable
        pagination
        paginationRowsPerPageOptions={[5, 10, 20]}
        paginationComponentOptions={{
          selectAllRowsItem: true,
          selectAllRowsItemText: "All",
        }}
        paginationPerPage={rowsPerPage}
        onSelectedRowsChange={handleSelectedRows}
        selectableRows={enhanced}
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsComponent={Checkbox}
        contextComponent={<EnhancedToolBar />}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          setRowsPerPage(currentRowsPerPage);
          setPage(currentPage - 1);
        }}
        onChangePage={(page, _) => {
          setPage(page - 1);
        }}
        title="Orders"
        columns={columns}
        data={enhanced ? enhancedRows : rows}
      />
    </Paper>
  );
};

export default TableRender;
