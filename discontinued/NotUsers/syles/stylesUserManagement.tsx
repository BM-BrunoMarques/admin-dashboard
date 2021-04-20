import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
      margin: theme.spacing(1),
    },
    cardContainer: {
      height: "450px",
      display: "flex",
    },
    cardFront: {
      display: "flex",
      width: "100%",
      position: "absolute",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      zIndex: 1,
      overflowY: "auto",
    },
    cardBack: {
      display: "flex",
      width: "100%",
      position: "absolute",
      height: "100%",
      flexDirection: "column",
      justifyCcontent: "start",
    },
  })
);
