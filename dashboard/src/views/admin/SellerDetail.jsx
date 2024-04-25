import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller,
  seller_status_update,
  messageClear,
} from "../../store/Reducers/sellerReducer";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);

  const { sellerId } = useParams();
  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId, dispatch]);

  const [status, setStatus] = useState(seller?.status);
  const [role, setRole] = useState(seller?.role);

  const submit = (e) => {
    e.preventDefault();
    if (role === "") {
      toast.error("Cần Chọn Chức Vụ Khi Xác Nhận!");
    } else {
      dispatch(
        seller_status_update({
          sellerId,
          status,
          role,
        })
      );
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);
  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);
  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4  bg-dark border rounded-md ">
          <div className="w-full flex flex-wrap text-[#d0d2d6] row">
            <div className="w-3/12 flex justify-center items-center py-3 bg-secondary border rounded">
              <div>
                {seller?.image ? (
                  <img
                    className="w-full h-[230px] rounded"
                    src="/images/admin.jpg"
                    alt=""
                  />
                ) : (
                  <span>chưa upload ảnh đại diện</span>
                )}
              </div>
            </div>
            <div className="w-4/12 ">
              <div className="px-0 md:px-5 py-2 ">
                <div className="py-2 text-lg">
                  <h2>Thông tin căn bản</h2>
                </div>
                <div className="flex text-white h6 justify-between text-sm flex-col gap-2 p-4 bg-secondary rounded-md border">
                  <div className="flex gap-2 ">
                    <span>Tên : </span>
                    <span>{seller?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Email : </span>
                    <span>{seller?.email}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Trạng thái : </span>
                    <span>
                      {seller?.status === "active"
                        ? "Đang Hoạt Động"
                        : "Ngừng Hoạt Động"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Chức vụ: </span>
                    <span>
                      {seller?.role === "nv_donhang"
                        ? "Duyệt Đơn Hàng"
                        : seller?.role === "nv_nhapkho"
                        ? "Nhập Kho"
                        : seller?.role === "nv_quanly"
                        ? "Quản Lý"
                        : seller?.role === "nv_sanpham"
                        ? "Quyền Sản Phẩm"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-5/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Địa chỉ</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-secondary border h6 text-white rounded-md">
                  {/* <div className="flex gap-2">
                    <span>Tên shop : </span>
                    <span>Shop-vn</span>
                  </div> */}
                  {/* <div className="flex gap-2">
                    <span>Phân công : </span>
                    <span>{seller?.shopInfo?.division}</span>
                  </div> */}
                  <div className="flex gap-2">
                    <span>Địa chỉ 1: </span>
                    <span>{seller?.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Địa chỉ 2 : </span>
                    <span>{seller?.shopInfo?.sub_district}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <form onSubmit={submit}>
              <div className="flex gap-4 py-3 col-md-4 ">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-secondary h6 text-white border border-slate-700 rounded-md text-[#d0d2d6]"
                  name=""
                  required
                  id=""
                >
                  <option value="active">Đang Hoạt Động</option>
                  <option value="deactive">Ngừng Hoạt Động</option>
                </select>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                  Xác Nhận
                </button>
              </div>
              <div className="flex gap-4 py-3 col-md-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-secondary h6 text-white border border-slate-700 rounded-md text-[#d0d2d6]"
                  name=""
                  required
                  id=""
                >
                  <option value="">--- Thay Đổi Chức Vụ ---</option>
                  <option value="nv_nhapkho">Nhân Viên Nhập Kho</option>
                  <option value="nv_sanpham">Nhân Viên Sản Phẩm</option>
                  <option value="nv_quanly">Nhân Viên Quản Lý</option>
                  <option value="nv_donhang">Nhân Viên Đơn Hàng</option>
                </select>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                  Xác Nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
