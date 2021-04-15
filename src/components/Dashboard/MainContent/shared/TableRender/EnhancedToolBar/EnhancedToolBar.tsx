import React from "react";
import IconButton from "@material-ui/core/IconButton"
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const EnhancedToolBar: React.FC = ({ selectedCount }: any) => {
  return (
    <div>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <DeleteOutline />
      </IconButton>
      {selectedCount} Selected
    </div>
  );
};

export default EnhancedToolBar;
