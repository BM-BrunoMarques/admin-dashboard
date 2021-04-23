interface data {
  title: string;
  tag: string;
  total: string;
  percentage: string;
  timePeriod: string;
}

export const cardData: data[] = [
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
export const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Orders processed",
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
      data: [25, 59, 80, 81, 56, 55, 70],
    },
    {
      label: "Orders returned",
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
      data: [2, 8, 5, 12, 4, 1, 14],
    },
  ],
};



export const doughnutData = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
