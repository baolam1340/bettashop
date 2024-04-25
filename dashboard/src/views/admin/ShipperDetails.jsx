import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_shipper,
  messageClear,
  update_profile_shipper,
} from "../../store/Reducers/shipperReducer";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "antd";
const ShipperDetails = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { shipperId } = useParams();

  const [state, setState] = useState({
    shipperId: shipperId,
    name: "",
    phoneNumber: "",
    cccd: "",
    address: "",
  });

  const { shipper, successMessage, loader } = useSelector(
    (state) => state.shipper
  );

  const add = (e) => {
    e.preventDefault();
    dispatch(update_profile_shipper(state));
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(get_shipper(shipperId));
  }, [shipperId, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);

  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          <div className="w-full flex flex-wrap text-[#d0d2d6]">
            <div className="w-3/12 flex justify-center items-center py-3">
              <div>
                {shipper?.image ? (
                  <img
                    className="w-full h-[230px]"
                    src="/images/admin.jpg"
                    alt=""
                  />
                ) : (
                  <span>chưa upload ảnh đại diện</span>
                )}
              </div>
            </div>
            <div className="w-6/12">
              {open && (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <div>
                    <button
                      onClick={() => setOpen(false)}
                      className="border p-2 bg-blue-500 rounded-md"
                    >
                      trở lại
                    </button>
                  </div>
                  <p className="text-center">Chỉnh sửa thông tin shipper</p>
                  <form onSubmit={add}>
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <label htmlFor="name">tên: </label>
                      <input
                        required
                        value={state.name}
                        onChange={inputHandle}
                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                        type="text"
                        placeholder="name"
                        name="name"
                        id="name"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <label htmlFor="phoneNumber">sdt</label>
                      <input
                        value={state.phoneNumber}
                        onChange={inputHandle}
                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                        type="number"
                        placeholder="số điện thoại"
                        name="phoneNumber"
                        id="phoneNumber"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <label htmlFor="cccd">cccd</label>
                      <input
                        value={state.cccd}
                        onChange={inputHandle}
                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                        type="number"
                        placeholder="cccd"
                        name="cccd"
                        id="cccd"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <label htmlFor="address">Địa chỉ</label>
                      <input
                        value={state.address}
                        onChange={inputHandle}
                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                        type="text"
                        placeholder="địa chỉ"
                        name="address"
                        id="address"
                      />
                    </div>
                    <button
                      disabled={loader ? true : false}
                      className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Cập Nhật"
                      )}
                    </button>
                  </form>
                </div>
              )}
              {!open && (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <Tooltip title="Chỉnh sửa thông tin shipper">

                  
                  <span
                    onClick={() => setOpen(true)}
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 right-2 top-2 absolute cursor-pointer"
                  >
                    <FaEdit />
                  </span></Tooltip>
                  <div className="py-2 text-lg">
                    <h2>Thông tin căn bản Shipper</h2>
                  </div>
                  <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                    <div className="flex gap-2">
                      <span>tên : </span>
                      <span>{shipper?.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>số điện thoại : </span>
                      <span>{shipper?.phoneNumber}</span>
                    </div>

                    <div className="flex gap-2">
                      <span>cccd : </span>
                      <span>{shipper?.cccd}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>địa chỉ : </span>
                      <span>{shipper?.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperDetails;
