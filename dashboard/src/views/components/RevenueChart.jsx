// RevenueChart.js
import React from "react";
import ReactApexChart from "react-apexcharts";

const RevenueChart = ({ chartData }) => {
  const options = {
    chart: {
      id: "revenue-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData.map((item) => item._id),
    },
  };

  const series = [
    {
      name: "Thu Nhập Ngày",
      data: chartData.map((item) => item.totalAmount),
    },
  ];

  return (
    <ReactApexChart
    className=" text-white"
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default RevenueChart;
