import React, { useState } from "react";
import ApexCharts from "react-apexcharts";

function Chart() {
  const [series, setSeries] = useState([
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    fill: {
      colors: ["#f46a06"],
    },
    plotOptions: {
      bar: {
        // borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#000000"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#000",
            colorTo: "#000",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    // title: {
    //   text: "Yearly analytics",
    //   floating: true,
    //   offsetY: 330,
    //   align: "center",
    //   style: {
    //     color: "#444",
    //     font,
    //   },
    // },
  });
  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default Chart;
