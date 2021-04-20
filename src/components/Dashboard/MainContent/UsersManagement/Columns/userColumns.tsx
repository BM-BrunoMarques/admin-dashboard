import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import * as SI from "../../../../../helpers/consts";
import Avatar from "react-avatar";

const base = {
  sortable: true,
  grow: false,
  wrap: true,
  center: true,
};

export const userColumns = (
  enhanced: boolean,
  handleDelete?: (id: number[]) => void
) => {
  const handleClickDelete = (id: number[]) => {
    if (handleDelete) {
      handleDelete(id);
    }
  };

  return [
    {
      cell: (props: SI.UserState) => {
        const { firstName, lastName } = props.info.name;
        return (
          <Avatar name={`${firstName} ${lastName}`} size="40" round={true} />
        );
      },
      width: 50,
      selector: "id",
      style: { display: "flex", textAlign: "start" },
      ...base,
    },
    { name: "Id", selector: "authentication.id", ...base },
    {
      cell: (props: SI.UserState) => {
        const { firstName, lastName } = props.info.name;
        return (
          <div data-tag="allowRowEvents">
            {firstName} {lastName}
          </div>
        );
      },

      name: "Name",
      width: 50,
      selector: "name",
      ...base,
      sortable: false,
    },
    { name: "Email", selector: "authentication.email", ...base },
    {
      cell: (props: SI.UserState) => {
        const { type } = props.authentication;
        const typeText = SI.UserType[type];
        return <div data-tag="allowRowEvents">{typeText}</div>;
      },
      name: "Type",
      width: 50,
      selector: "id",
      ...base,
      sortable: false,
    },
    {
      cell: (props: SI.UserState) => (
        <IconButton
          onClick={() => handleClickDelete([props.authentication.id])}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <DeleteOutline />
        </IconButton>
      ),
      width: 50,
      selector: "id",
      style: { display: "flex", justifyContent: "flex-end" },
      ...base,
    },
  ];
};
