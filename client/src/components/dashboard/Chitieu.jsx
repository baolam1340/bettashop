import React from "react";

const Chitieu = () => {
  return (
    <div className="bg-white p-2 rounded-md ">
      <div className="flex w-full items-center justify-between">
        <div className="flex">
          <span>Số tiền bạn đã chi tiêu:</span>
          <span>0d</span>
        </div>

        <div className="w-[150px]  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
          Thanh vien dong
        </div>
      </div>
      <div className="h-[10px] w-full bg-slate-300 rounded-md">
        <div className="h-full bg-green-500 rounded-md w-[20%]"></div>
      </div>
      <div className="text-center">
        ban can chi tieu them 10.000.000 d de len hang dong
      </div>
    </div>
  );
};

export default Chitieu;
