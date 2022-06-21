import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

function Chart({ data }) {
  const [series, setSeries] = useState([
    {
      name: "Price",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 0,
    },

    grid: {
      row: {
        colors: ["#fff", "#f1e8d7"],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        "01st",
        "02nd",
        "03rd",
        "04th",
        "05th",
        "06th",
        "07th",
        "08th",
        "09th",
        "10th",
        "11st",
        "12nd",
        "13rd",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21st",
        "22nd",
        "23rd",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31st",
      ],
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        text:
          "Price History for " +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear(),
      },
    },
    fill: {
      colors: ["#f46a06"],
    },
  });

  const compare = (a, b) => {
    if (a.day < b.day) {
      return -1;
    }
    if (a.day > b.day) {
      return 1;
    }
    return 0;
  };
  useEffect(() => {
    const res = [];
    const res2 = [];
    const ss = [...data];
    ss.sort(compare);
    for (let i = 0; i < ss.length; i++) {
      res.push(ss[i].price);
      res2.push("On " + ss[i].day + "/" + ss[i].month + "/" + ss[i].year);
    }
    setSeries([
      {
        name: "Price",
        data: [...res],
      },
    ]);
    setOptions({
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 0,
      },

      grid: {
        row: {
          colors: ["#fff", "#f1e8d7"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: res2,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text:
            "Price History for " +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
        },
      },
      fill: {
        colors: ["#f46a06"],
      },
    });
  }, [data]);

  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default Chart;
