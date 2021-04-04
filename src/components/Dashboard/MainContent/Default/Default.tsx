import React, { useState, useRef, useEffect } from "react";
// import UserManagement from "./Users/UserManagement";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

//
import MasonryWrap from "../MasonryWrap/MasonryWrap";
//
import PrivateUserRoute from "../PrivateUserRoute/PrivateUserRoute";
import RenderCard from "./RenderCard/RenderCard";
import { Chart } from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import OrdersTable from "./OrdersTable/OrdersTable";

//maps
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const useStyles = makeStyles({
  container: {
    padding: "20px 17px",
    boxShadow:
      "rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px",
    borderRadius: "6px",
    backgroundColor: "#FFF",
  },
});

interface data {
  title: string;
  tag: string;
  total: string;
  percentage: string;
  timePeriod: string;
}

const cardData: data[] = [
  {
    title: "Sales Today",
    tag: "Today",
    total: "2.532",
    percentage: "+26%",
    timePeriod: "last week",
  },
  {
    title: "Visitors",
    tag: "Annual",
    total: "170.212",
    percentage: "-14%",
    timePeriod: "Since last week",
  },
  {
    title: "Total Earnings",
    tag: "Monthly",
    total: "$ 24.300",
    percentage: "+18%",
    timePeriod: "last week",
  },
  {
    title: "Bounce",
    tag: "Yearly",
    total: "12.364",
    percentage: "+27%",
    timePeriod: "last week",
  },
];
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "My Second dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,82,192,0.4)",
      borderColor: "rgba(75,90,112,1)",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [40, 55, 56, 81, 80, 59, 65],
    },
  ],
};

const doughnutData = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const Default: React.FC = (props) => {
  const [gridHeight, setGridSize] = useState<number>();
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    setGridSize(cardsGridRef!.current!.offsetHeight - 8);
  }, [cardsGridRef]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={7} ref={cardsGridRef}>
          <Grid container spacing={1}>
            {cardData.map((card) => (
              <Grid item key={card.title} xs={12} sm={6}>
                <RenderCard data={card} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid xs={12} md={5} item style={{ height: gridHeight }}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </Grid>

        <Grid item xs={12} md={5}>
          <ComposableMap>
            <Geographies geography={geoUrl} fill="#BBB" stroke="#FFF">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            <Marker coordinates={[-74.006, 40.7128]}>
              <circle r={8} fill="#F53" />
            </Marker>
          </ComposableMap>
        </Grid>

        <Grid xs={12} md={7}>
          <OrdersTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Default;

{
  /*
  MasonryWrap
  <Grid container spacing={1}>
        <Grid ref={cardsGridRef} item xs={12} lg={5} component={"div"}>
          <Grid container spacing={1}>
            {cardData.map((card) => (
              <Grid item key={card.title} xs={12} sm={6}>
                <RenderCard data={card} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          className={classes.container}
          style={{
            position: "relative",
            margin: " auto",
            width: "77vw",
            maxHeight: "400px",
            height: gridHeight,
          }}
          item
          xs={12}
          lg={7}
        >
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <BreakpointMasonry>
          <Grid item xs={12} lg={5} component={"div"}>
            <ComposableMap>
              <Geographies geography={geoUrl} fill="#BBB" stroke="#FFF">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <Marker coordinates={[-74.006, 40.7128]}>
                <circle r={8} fill="#F53" />
              </Marker>
            </ComposableMap>
          </Grid>

          <Grid item lg={7} xs={12} className={classes.container}>
            <OrdersTable />
          </Grid>
        </BreakpointMasonry>
        <BreakpointMasonry>
          <Grid item xs={12} lg={5} className={classes.container}>
            <OrdersTable />
          </Grid>

          <Grid item xs={12} lg={7} component={"div"}>
            <ComposableMap>
              <Geographies geography={geoUrl} fill="#BBB" stroke="#FFF">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <Marker coordinates={[-74.006, 40.7128]}>
                <circle r={8} fill="#F53" />
              </Marker>
            </ComposableMap>
          </Grid>
        </BreakpointMasonry>
      </Grid>*/
}
