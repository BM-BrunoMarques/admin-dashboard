import React from "react";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./stylesRenderCard";

interface CardProps {
  data: {
    title: string;
    tag: string;
    total: string;
    percentage: string;
    timePeriod: string;
  };
}

const RenderCard: React.FC<CardProps> = (props) => {
  const classes = useStyles();

  const { title, tag, total, percentage, timePeriod } = props.data;

  return (
    <Card className={classes.root}>
      <div className={classes.topSection}>
        {title && <Typography variant="h6">{title}</Typography>}
        {tag && (
          <Chip
            color="primary"
            size="small"
            className={classes.chip}
            label={tag}
          />
        )}
      </div>

      <div className={classes.middleSection}>
        {total && <Typography variant="h5">{total}</Typography>}
      </div>
      <div className={classes.endSection}>
        {percentage && (
          <Typography  variant="subtitle2">
            <span
              className={`${classes.tag} ${
                percentage.charAt(0) === "+"
                  ? classes.positive
                  : classes.negative
              }`}
            >
              {percentage}
            </span>
          </Typography>
        )}
        {timePeriod && <Typography variant="caption">{timePeriod}</Typography>}
      </div>
    </Card>
  );
};

export default RenderCard;
