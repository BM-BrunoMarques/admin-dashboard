import React, { useState, useEffect } from "react";

import * as SI from "../../../../../helpers/consts";
import Paper from "@material-ui/core/Paper";
import DataTable from "react-data-table-component";
import EnhancedToolBar from "./EnhancedToolBar/EnhancedToolBar";
import Checkbox from "@material-ui/core/Checkbox";
import SearchInput from "./SearchInput/SearchInput";
import { useTheme, withStyles } from "@material-ui/core/styles";
import DeleteButton from "./DeleteButton/DeleteButton";

import "./table.css";

type BaseProps = {
  parent: "ordersManagement" | "dashboard" | "usersManagement";
  rows: any;
  columns?: any;
};

type EnhancedProps = {
  enhanced: true;
  handleDeleteUsers: (id: SI.deleteProps) => void;
  setVisibleRows?: never;
};

type UnenhancedProps = {
  enhanced: false;
  handleDeleteUsers?: never;
  setVisibleRows: React.Dispatch<React.SetStateAction<SI.OrderState[]>>;
  selected?: never;
  setSelected?: never;
};

type OrderTableProps = BaseProps & (EnhancedProps | UnenhancedProps);

const TableRender: React.FC<OrderTableProps> = (props) => {
  const theme = useTheme();
  const enhancedProps: OrderTableProps = {
    enhanced: true,
    parent: props.parent,
    rows: props.rows,
    handleDeleteUsers: props.handleDeleteUsers!,
  };

  const unenhancedProps: OrderTableProps = {
    enhanced: false,
    parent: props.parent,
    rows: props.rows,
    setVisibleRows: props.setVisibleRows!,
  };

  const { enhanced, rows, parent, columns } = props;
  const { setVisibleRows } = unenhancedProps;
  const { handleDeleteUsers } = enhancedProps;

  const [enhancedRows, setEnhancedRows] = useState<
    SI.OrderState[] | SI.UserState[]
  >([]);
  const [toggledClearSelected, setClearSelected] = useState(false);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    header: {
      style: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.type === "dark" ? "#fff" : "#000",
        textAlign: "start",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
      MuiCheckboxRoot: {
        style: {
          color: "#f50057",
        },
      },
    },
  };

  useEffect(() => {
    setEnhancedRows(rows);
    setClearSelected((prev) => !prev);
  }, [rows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [enhancedRows]);

  useEffect(() => {
    if (!enhanced) {
      setVisibleRows(
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
    setEnhancedRows(rows);
  }, []);

  useEffect(() => {
    if (!enhanced) {
      setVisibleRows(
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [rowsPerPage, page]);

  interface selectedRowsState {
    selectedRows: SI.OrderState[] | SI.UserState[];
  }

  const handleSelectedRows = (state: selectedRowsState) => {
    let selectedIds;
    if (!(parent === "usersManagement")) {
      selectedIds = (state.selectedRows as SI.OrderState[]).map(
        (row) => row.id
      );
    } else {
      selectedIds = (state.selectedRows as SI.UserState[]).map(
        (row) => row.authentication.id
      );
    }
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
        customStyles={customStyles}
        paginationPerPage={rowsPerPage}
        onSelectedRowsChange={handleSelectedRows}
        selectableRows={enhanced}
        selectableRowsVisibleOnly
        selectableRowsHighlight
        contextActions={<DeleteButton />}
        clearSelectedRows={toggledClearSelected}
        selectableRowsComponent={Checkbox}
        contextComponent={
          <EnhancedToolBar
            handleDeleteUsers={handleDeleteUsers}
            selectedRows={selectedRows}
          />
        }
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          setRowsPerPage(currentRowsPerPage);
          setPage(currentPage - 1);
        }}
        onChangePage={(page, _) => {
          setPage(page - 1);
        }}
        title={parent === "usersManagement" ? "Users" : "Orders"}
        columns={columns}
        data={enhanced ? enhancedRows : rows}
      />
    </Paper>
  );
};

export default TableRender;
