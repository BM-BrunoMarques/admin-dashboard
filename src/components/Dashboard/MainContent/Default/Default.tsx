import React from "react";
// import UserManagement from "./Users/UserManagement";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import PrivateUserRoute from "../PrivateUserRoute/PrivateUserRoute";
import RenderCard from "./RenderCard/RenderCard";
import { Line, Doughnut } from "react-chartjs-2";

interface data {
  title: string;
  tag: string;
  total: string;
  percentage: string;
  timePeriod: string;
}

const data: data[] = [
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
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
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
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
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

const Default: React.FC = () => {
  return (
    <>
      <Grid container spacing={1}>
        {data.map((card) => (
          <Grid item key={card.title} xs={12} md={3}>
            <RenderCard data={card} />
          </Grid>
        ))}
        {/* <Line data={chartData} width={100} height={50}  options={{ maintainAspectRatio: false }}/> */}
      </Grid>

      <Grid container spacing={1}>
        <Grid
          item
          md={7}
          xs={12}
          style={{ position: "relative", margin: " auto", width: "77vw" }}
        >
          <Line data={chartData} />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          style={{ position: "relative", margin: " auto", width: "77vw" }}
        >
          <Doughnut data={doughnutData} />
        </Grid>
      </Grid>
    </>
  );
};

export default Default;
