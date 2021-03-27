import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 17px",
    boxShadow: 'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius: '6px',
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  middleSection: {
    display: "flex",
    justifyContent: "start",
  },
  endSection: {
    display: "flex",
    justifyContent: "start",
    alignItems: "baseline",
  },
  chip: {},
  tag: {
    display: "block",
    padding: "2px",
    marginRight: "6px",
  },
  positive: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "4CAF50",
  },
  negative: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    color: "#F44336",
  },
});
