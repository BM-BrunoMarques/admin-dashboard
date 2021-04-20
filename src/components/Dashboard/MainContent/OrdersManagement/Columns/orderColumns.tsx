import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import * as SI from "../../../../../helpers/consts";

const base = {
  sortable: true,
  grow: false,
  wrap: true,
  center: true,
};

export const orderColumns = (
  enhanced: boolean,
  handleDelete?: (id: number[]) => void
) => {
  const handleClickDelete = (id: number[]) => {
    if (handleDelete) {
      handleDelete(id);
    }
  };

  return [
    { name: "id", selector: "id", ...base },
    { name: "Name", selector: "name", ...base },
    { name: "Date", selector: "date", ...base },
    { name: "Address", selector: "address", ...base },
    { name: "Country", selector: "country.name", ...base },
    {
      name: "Total",
      selector: "total",
      sortable: true,
      grow: false,
    },
    { name: "Status", selector: "status", ...base },
    {
      cell: (props: SI.OrderState) => (
        <IconButton
          onClick={() => handleClickDelete([props.id])}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <DeleteOutline />
        </IconButton>
      ),
      width: 50,
      selector: "id",
      style: { display: "block", textAlign: "end" },
      omit: !enhanced,
    },
  ];
};
