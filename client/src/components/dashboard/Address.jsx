/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAddress,
  deleteUserAddress,
  messageClear,
} from "../../store/reducers/authReducer";
import { Country, State } from "country-state-city";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [addressType, setAddressType] = useState("");
  const { userInfo, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Mặc định",
    },
    {
      name: "Nhà, nơi thường trú",
    },
    {
      name: "Văn phòng, nơi làm việc",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Vui lòng điền vào tất cả các mục!");
    } else {
      const data = {
        country: country,
        city: city,
        address1: address1,
        addressType: addressType,
      };

      dispatch(updateUserAddress(data));
      setOpen(false);
      setCountry("VN");
      setCity("");
      setAddress1("");
      setAddressType("");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  console.log(userInfo.addresses?.length);

  return (
    <div className="w-full px-5 bg-secondary pb-[100px] rounded-md">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll sm:w-[70%]">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] ">Thêm địa chỉ</h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Khu vực:</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        chọn khu vực
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Thành phố, tỉnh thành:</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        chọn thành phố, tỉnh thành
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Địa chỉ 1 (Điền đầy đủ: số nhà, tên đường, phường, xóm,
                      huyện, xã, phường thành phố)
                    </label>
                    <input
                      type="address"
                      className="w-full border p-1 rounded-[5px]"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Loại địa chỉ</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Chọn loại địa chỉ
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className="w-full border p-1 rounded-[5px] mt-5 cursor-pointer"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 mt-4">
          Địa chỉ của tôi
        </h1>
        {/**them dia chi moi */}
        <div
          className=" btn btn-primary flex items-center justify-center rounded-xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="">Thêm địa chỉ mới</span>
        </div>
      </div>
      <br />
      {userInfo &&
        userInfo.addresses?.map((item, index) => (
          <div
            className="w-full p-3 bg-white h-min 800px:h-[70px] rounded-md flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600] text-lg">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset] text-lg">
                {item.address1}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset] text-lg">
                (+84) {userInfo && userInfo.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {(userInfo.addresses?.length === "undefined" ||
        !userInfo?.addresses ||
        "") && (
        <h5 className="text-center pt-8 text-[18px]">
          Bạn chưa cập nhật địa chỉ nào!!!
        </h5>
      )}
    </div>
  );
};

export default Address;
