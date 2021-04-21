import { makeStyles } from "@material-ui/core/styles";

export const parentStyles = (parent) => {
  const base = {
    paper: {
      width: "100%",
      maxHeight: "400px",
      overflowX: "auto",
    },
    tableWrap: {
      height: "200px",
      border: "2px solid black",
      overflow: "auto",
    },
  };

  switch (parent) {
    case "ordersManagement":
      return makeStyles({
        ...base,
        paper: {
          ...base.paper,
          maxHeight: "1000px",
        },
      });
      break;
    default:
      return makeStyles(base);
  }
};
