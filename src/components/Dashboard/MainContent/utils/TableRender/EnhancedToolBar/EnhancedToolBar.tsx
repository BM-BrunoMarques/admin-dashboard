import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const EnhancedToolBar: React.FC<any> = ({
  selectedCount,
  handleDeleteUsers,
  selectedRows,
}) => {
  const handleDelete = () => {
    handleDeleteUsers(selectedRows);
  };

  return (
    <>
      {selectedRows && (
        <>
          <IconButton
            onClick={handleDelete}
            color="primary"
            aria-label="delete"
            component="span"
          >
            <DeleteOutline />
          </IconButton>
          {selectedCount} Selected
        </>
      )}
    </>
  );
};

export default EnhancedToolBar;
