/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

import { get_admin_dashboard_index_data } from "../../store/Reducers/dashboardIndexReducer";
import RevenueChart from "../components/RevenueChart";
import RevenueTable from "../components/RevenueTable";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrders,
    recentMessage,
    total_thunhap_thang,
    result_ngay,
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
    t7,
    tt8,
    t9,
    t10,
    t11,
    t12,
  } = useSelector((state) => state.dashboardIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, [dispatch]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "tổng tiền",
        data: [],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (!Array.isArray(total_thunhap_thang)) {
      console.error("Data is not an array");
      return null;
    }
    const yourData = total_thunhap_thang;

    const convertedData = yourData.reduce(
      (acc, item) => {
        acc[0].data.push(item.totalAmount);
        return acc;
      },
      [{ name: "Tổng Thu Nhập", data: [] }]
    );

    setChartData({
      ...chartData,
      series: convertedData,
      options: {
        ...chartData.options,
        xaxis: {
          categories: yourData.map((item) => item.manth),
        },
      },
    });
  }, [chartData, total_thunhap_thang]);

  return (
    <div className="px-2 md:px-7 py-3  container">
      <div className="row">
        <div className="w-full col-md-10 rounded  m-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
          <div className="row items-center  p-3 bg-dark rounded border m-2 ">
            <div className="col-md-7  flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">
                {totalSale.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </h2>
              <span className="text-md font-medium">Doanh Thu</span>
            </div>
            <div className="col-md-3 h2 p-2 col-md-3 rounded-full bg-secondary flex justify-center items-center text-xl">
              <BsCurrencyDollar className="text-warning shadow-lg" />
            </div>
          </div>
          <div className=" items-center row p-3 bg-dark rounded border m-2 ">
            <div className="col-md-7 flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{totalProduct}</h2>
              <span className="text-md font-medium">Tổng Sản Phẩm</span>
            </div>
            <div className="h2 p-2 col-md-3 rounded-full bg-secondary flex justify-center items-center text-xl">
              <RiProductHuntLine className="text-warning shadow-lg" />
            </div>
          </div>

          <div className=" items-center row p-3 bg-dark rounded border m-2 ">
            <div className="col-md-7 flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{totalOrder}</h2>
              <span className="text-md font-medium">Tổng Đơn Hàng</span>
            </div>
            <div className="h2 p-2 col-md-3 rounded-full bg-secondary flex justify-center items-center text-xl">
              <AiOutlineShoppingCart className="text-warning shadow-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 m-3  w-full flex flex-wrap mt-7">
          <div className="w-full lg:pr-3 ">
            <div className="w-full bg-dark border  p-4 rounded-md">
              <h2 className="text-white">Thống kê theo ngày</h2>
              <div class="bg-dark border-none rounded-2 shadow-md h-full mt-4">
                <div className="bg-light border rounded-lg shadow-md h-[400px] m-2">
                  {/* <RevenueChart chartData={result_ngay} /> */}

                  <RevenueTable
                    className="text-white "
                    tableData={result_ngay}
                  />
                  {/* <iframe
                  class="w-full h-full"
                  src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=653512a4-c4df-476a-8533-3f3dce2fb8bb&maxDataAge=60&theme=dark&autoRefresh=true"
                  frameborder="0"
                ></iframe> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row w-full flex mt-7">
        <div className="col-md-10 m-3  w-full lg:pr-3">
          <div className="w-full bg-dark p-4 rounded-md border">
            <h2 className="text-white">Thống kê theo tháng</h2>
            <div className=" border-none rounded-2 shadow-md h-[350px]">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
              />
              {/* <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=65350d57-8afe-46d3-82fe-6fddd28ca39d&maxDataAge=300&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row w-full flex mt-7">
        <div className="col-md-10 m-3 w-full lg:pr-3">
          <div className="w-full bg-dark p-4 rounded-md border">
            <h2 className="text-white">Thống kê theo năm</h2>
            <div className="bg-dark border-none rounded-2 shadow-md h-[350px]">
              <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-project-0-mjjgn/embed/charts?id=65fa89bb-ad57-4381-887a-de05c3711d5e&maxDataAge=3600&theme=dark&autoRefresh=true"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
