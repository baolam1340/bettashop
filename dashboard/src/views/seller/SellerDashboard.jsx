/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import customer from "../../assets/seller.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  get_seller_dashboard_index_data,
  thongke,
} from "../../store/Reducers/dashboardIndexReducer";

const SellerDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    totalSeller,
    recentOrders,
    recentMessage,
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
    t7,
    t8,
    t9,
    t10,
    t11,
    t12,
    tt1,
    tt2,
    tt3,
    tt4,
    tt5,
    tt6,
    tt7,
    tt8,
    tt9,
    tt10,
    tt11,
    tt12,
  } = useSelector((state) => state.dashboardIndex);

  const state = {
    series: [
      {
        name: "Đơn",
        data: [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12],
      },

      {
        name: "Tiền",
        data: [tt1, tt2, tt3, tt4, tt5, tt6, tt7, tt8, tt9, tt10, tt11, tt12],
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
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
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
              "T1",
              "T2",
              "T3",
              "T4",
              "T5",
              "T6",
              "T7",
              "T8",
              "T9",
              "T10",
              "T11",
              "T12",
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
  };

  const state1 = {
    series: [
      {
        name: "Đơn",
        data: [t1 + t2 + t3, t4 + t6 + t5, t7 + t8 + t9, t10 + t11 + t12],
      },

      {
        name: "Tiền",
        data: [
          tt1 + tt2 + tt3,
          t4 + tt6 + tt5,
          tt7 + tt8 + tt9,
          tt10 + tt11 + tt12,
        ],
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
        categories: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
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
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_seller_dashboard_index_data({ sellerId: userInfo._id }));
    dispatch(thongke());
  }, []);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">
              {totalSale.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </h2>
            <span className="text-md font-medium">Tổng Thu Nhập</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Sản Phẩm</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
            <span className="text-md font-medium">Đơn Hàng Đang Chờ</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className="text-white">Thống kê theo ngày</h2>
            <div class="bg-[#283046] border-none rounded-2 shadow-md h-[350px]">
              <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=653512a4-c4df-476a-8533-3f3dce2fb8bb&maxDataAge=60&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe>
            </div>
            {/* <div class="bg-[#283046] rounded-lg shadow-md h-[350px]">
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div> */}
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Tin nhắn gần đây của khách hàng
              </h2>
              <Link
                to="/seller/dashboard/chat-customer"
                className="font-semibold text-sm text-[#d0d2d6] hover:text-green-400"
              >
                Xem Tất Cả
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li key={i} className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      {m.senderId === userInfo._id ? (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={userInfo.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={customer}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-7 text-white">
        <div className="w-full lg:w-6/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2>Thống kê theo tháng</h2>
            <div class="bg-[#283046] border-none rounded-2 shadow-md h-[350px]">
              <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=65350d57-8afe-46d3-82fe-6fddd28ca39d&maxDataAge=300&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2>Thống kê theo năm</h2>
            <div class="bg-[#283046] border-none rounded-2 shadow-md h-[350px]">
              <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=65351768-8afe-44a0-8a28-6fddd294071c&maxDataAge=3600&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4  bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Những Đơn Hàng Gần Đây
          </h2>
          <Link
            to="/seller/dashboard/orders"
            className="font-semibold text-sm text-[#d0d2d6] hover:text-green-400"
          >
            Xem Tất Cả
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Đơn Hàng Id
                </th>
                <th scope="col" className="py-3 px-4">
                  giá
                </th>
                <th scope="col" className="py-3 px-4">
                  trạng thái mua
                </th>
                <th scope="col" className="py-3 px-4">
                  trạng thái đơn hàng
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {d.price} đ
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.delivery_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.payment_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link
                      className="hover:text-green-400"
                      to={`/seller/dashboard/order/details/${d._id}`}
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
