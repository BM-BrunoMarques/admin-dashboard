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
  handleDeleteUsers: (id: SI.deleteProps) => void;
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
  const [TableRows, SetTableRows] = useState<SI.OrderState[]>([]);
  const setVisibleRows = props.setVisibleRows;

  useEffect(() => {
    console.log("rows", rows, "tableRows ", TableRows);

    setEnhancedRows(rows);
  }, [rows]);

  const [enhancedRows, setEnhancedRows] = useState<SI.OrderState[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  interface selectedRowsState {
    selectedRows: SI.OrderState[];
  }

  const handleSelectedRows = (state: selectedRowsState) => {
    const selectedIds = state.selectedRows.map((row) => row.id);
    setSelectedRows(selectedIds);
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
        keyField="id"
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
