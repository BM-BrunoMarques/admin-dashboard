import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { orderColumns } from "../OrdersManagement/Columns/orderColumns";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAppSelector } from "../../../../app/hooks";
import RenderCard from "./RenderCard/RenderCard";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import TableRender from "../utils/TableRender/TableRender";
import * as SI from "../../../../helpers/consts";
import OrdersMap from "./OrdersMap/OrdersMap";
import { cardData, chartData } from "./data/data";

export const useStyles = makeStyles({
  container: {
    padding: "20px 17px",
    boxShadow:
      "rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px",
    borderRadius: "6px",
    backgroundColor: "#FFF",
  },
});

const Default: React.FC = () => {
  const theme = useTheme();
  const columns = orderColumns(false);
  const { orders } = useAppSelector((state) => state.orders);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [gridHeight, setGridSize] = useState<number>();
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<SI.OrderState[]>([]);

  useEffect(() => {
    setGridSize(cardsGridRef!.current!.offsetHeight - 8);
  }, [cardsGridRef]);

  return (
    <>
      <Grid container>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Grid item xs={12} md={5}>
            <Grid container spacing={1} ref={cardsGridRef}>
              {cardData.map((card) => (
                <Grid item key={card.title} xs={12} sm={6}>
                  <RenderCard data={card} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            xs={12}
            md={6}
            item
            style={{
              position: "relative",
              height: isSmall ? "265px" : '320px',
            }}
          >
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={isSmall ? 3 : 4}
          alignItems="center"
          justify="center"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "40px",
          }}
        >
          <Grid item xs={12} lg={5}>
            <OrdersMap visibleRows={visibleRows} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TableRender
              rows={orders}
              columns={columns}
              setVisibleRows={setVisibleRows}
              enhanced={false}
              parent="dashboard"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Default;
