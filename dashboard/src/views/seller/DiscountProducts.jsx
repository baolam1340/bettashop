/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { get_products_seller } from "../../store/Reducers/sellerReducer";
import { AiOutlineDelete } from "react-icons/ai";
import { Tooltip } from "antd";

const DiscountProducts = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [value, setValue] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(get_products_seller());
  }, [dispatch]);

  const handleDelete = async (id) => {
    api
      .delete(`/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Xóa thành công!!");
      });
    window.location.reload();
  };

  const id = "65377d3f6e191e47c12285e7";

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/coupon/get-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, userInfo._id]);

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api
      .post(
        `/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct,
          value,
          endDate,
          shopId: userInfo._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đã tạo mã giảm giá thành công!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Mã giảm giá",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá trị",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Xóa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Xóa Mã Giảm Giá">
              <Button onClick={() => handleDelete(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <div className="px-2 md:px-7 py-5">
      {isLoading ? (
        "<Loader />"
      ) : (
        <div className="w-full pt-1 bg-[#283046] rounded-md">
          <div className="w-full flex justify-end">
            <div
              className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 bg-[#f61d1deb]`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Thêm mã giảm giá</span>
            </div>
          </div>
          <div className="text-white p-4">
            <DataGrid
              className="bg-white"
              rows={row}
              columns={columns}
              sx={{
                borderBlock: "black",
                color: "black",
                boxShadow: 2,
                border: 2,
                borderColor: "black",
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Thêm mã giảm giá
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Thêm tên mã giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Số lượng giảm (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Nhập % giảm giá (% < 100%)..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Số tiền tổi thiểu</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Nhập số tiền tối thiểu có thể giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Số tiền tối đa</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Nhập số tiền tối đa có thể giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Ngày kết thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="price"
                      id="start-date"
                      value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handleEndDateChange}
                      min={minEndDate}
                      placeholder="Enter your event product stock..."
                    />
                  </div>

                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Tạo mã giảm giá"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] bg-[#050505bd] text-[#fff] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountProducts;
