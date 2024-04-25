const authorOrder = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const sellerWallet = require("../../models/sellerWallet");
const myShopWallet = require("../../models/myShopWallet");
const sellerModel = require("../../models/sellerModel");
const authOrder = require("../../models/authOrder");
const shipperModel = require("../../models/shipperModel");

const adminSellerMessage = require("../../models/chat/adminSellerMessage");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessage");
const productModel = require("../../models/productModel");
const moment = require("moment");
const {
  mongo: { ObjectId },
} = require("mongoose");
const { responseReturn } = require("../../utils/response");

module.exports.get_seller_dashboard_data = async (req, res) => {
  const { id } = req;
  const { sellerId } = req.params;

  try {
    const totalSele = await sellerWallet.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const thongke_tien = await sellerWallet.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $project: {
          _id: 0,
          birthMonth: { $month: "$createdAt" },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    let tt1 = 0,
      tt2 = 0,
      tt3 = 0,
      tt4 = 0,
      tt5 = 0,
      tt6 = 0,
      tt7 = 0,
      tt8 = 0,
      tt9 = 0,
      tt10 = 0,
      tt11 = 0,
      tt12 = 0;

    for (let i = 0; i < thongke_tien.length; i++) {
      switch (thongke_tien[i].birthMonth) {
        case 1:
          tt1 = tt1 + thongke_tien[i].totalAmount;
          break;
        case 2:
          tt2 = tt2 + thongke_tien[i].totalAmount;
          break;
        case 3:
          tt3 = tt3 + thongke_tien[i].totalAmount;
          break;
        case 4:
          tt4 = tt4 + thongke_tien[i].totalAmount;
          break;
        case 5:
          t5 = tt5 + thongke_tien[i].totalAmount;
          break;
        case 6:
          tt6 = tt6 + thongke_tien[i].totalAmount;
          break;
        case 7:
          tt7 = tt7 + thongke_tien[i].totalAmount;
          break;
        case 8:
          tt8 = tt8 + thongke_tien[i].totalAmount;
          break;
        case 9:
          tt9 = tt9 + thongke_tien[i].totalAmount;
          break;
        case 10:
          tt10 = tt10 + thongke_tien[i].totalAmount;
          break;
        case 11:
          tt11 = tt11 + thongke_tien[i].totalAmount;
          break;
        case 12:
          tt12 = tt12 + thongke_tien[i].totalAmount;
          break;
      }
    }

    const totalProduct = await productModel.find({}).countDocuments();

    const totalOrder = await customerOrder.find({}).countDocuments();

    const totalPendingOrder = await authorOrder
      .find({
        $and: [
          {
            delivery_status: {
              $eq: "Chưa Xử Lí",
            },
          },
        ],
      })
      .countDocuments();

    const messages = await sellerCustomerMessage
      .find({
        $or: [
          {
            senderId: {
              $eq: id,
            },
          },
          {
            receverId: {
              $eq: id,
            },
          },
        ],
      })
      .limit(3);

    const recentOrders = await authorOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .limit(5);

    const array = [];

    const thongke = await authorOrder.aggregate([
      {
        $match: {
          sellerId: {
            $eq: new ObjectId(sellerId),
          },
        },
      },
      {
        $project: {
          _id: 0,
          birthMonth: { $month: "$createdAt" },
        },
      },
    ]);

    let t1 = 0,
      t2 = 0,
      t3 = 0,
      t4 = 0,
      t5 = 0,
      t6 = 0,
      t7 = 0,
      t8 = 0,
      t9 = 0,
      t10 = 0,
      t11 = 0,
      t12 = 0;

    for (let i = 0; i < thongke.length; i++) {
      switch (thongke[i].birthMonth) {
        case 1:
          t1 = t1 + 1;
          break;
        case 2:
          t2 = t2 + 1;
          break;
        case 3:
          t3 = t3 + 1;
          break;
        case 4:
          t4 = t4 + 1;
          break;
        case 5:
          t5 = t5 + 1;
          break;
        case 6:
          t6 = t6 + 1;
          break;
        case 7:
          t7 = t7 + 1;
          break;
        case 8:
          t8 = t8 + 1;
          break;
        case 9:
          t9 = t9 + 1;
          break;
        case 10:
          t10 = t10 + 1;
          break;
        case 11:
          t11 = t11 + 1;
          break;
        case 12:
          t12 = t12 + 1;
          break;
      }
    }

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
      totalPendingOrder,
      messages,
      recentOrders,
      totalProduct,
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
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.get_admin_dashboard_data = async (req, res) => {
  const { id } = req;
  try {
    const totalSele = await myShopWallet.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const total_thunhap_thang = await myShopWallet.aggregate([
      {
        $group: {
          _id: {
            manth: "$manth",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0, // Bỏ qua _id trong kết quả
          manth: "$_id.manth",
          year: "$_id.year",
          totalAmount: 1,
        },
      },
    ]);

    const result_ngay = await myShopWallet.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "+07:00",
            },
          },
        },
      },
      {
        $group: {
          _id: "$createdAtDate",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    console.log(result_ngay)

    const totalProduct = await productModel.find({}).countDocuments();

    const totalOrder = await customerOrder.find({}).countDocuments();

    const totalSeller = await sellerModel.find({}).countDocuments();

    const messages = await adminSellerMessage.find({}).limit(3);

    const recentOrders = await customerOrder.find({}).limit(5);

    responseReturn(res, 200, {
      result_ngay,
      total_thunhap_thang,
      totalOrder,
      totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
      totalSeller,
      messages,
      recentOrders,
      totalProduct,
    });
  } catch (error) {
    console.log("get admin dashboard data error " + error.messages);
  }
};

module.exports.get_shipper_new_order = async (req, res) => {
  try {
    const orders = await customerOrder.find({}).sort({ updatedAt: -1 });

    Total_TimShipper = await customerOrder
      .find({ delivery_status: "Tìm Shipper" })
      .countDocuments();

    Total = await customerOrder
      .find({
        $or: [
          {
            $and: [
              {
                delivery_status: "Đã Giao Hàng",
              },
            ],
          },
          {
            $and: [
              {
                delivery_status: "Tìm Thấy Shipper",
              },
            ],
          },
          {
            $and: [
              {
                delivery_status: "Shipper Nhận Được Hàng",
              },
            ],
          },
          {
            $and: [
              {
                delivery_status: "Vận Chuyển",
              },
            ],
          },
          {
            $and: [
              {
                delivery_status: "Đang Giao Hàng",
              },
            ],
          },
          {
            $and: [
              {
                delivery_status: "Giao Hàng Thành Công",
              },
            ],
          },
        ],
      })
      .countDocuments();

    Total_Complete = await customerOrder
      .find({ delivery_status: "Đã Giao Hàng" })
      .countDocuments();

    responseReturn(res, 200, {
      orders,
      Total_TimShipper,
      Total_Orders: Total,
      Total_Complete,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.thongke = async (req, res) => {
  const { id } = req;
};

module.exports.comfirm_order_shipper = async (req, res) => {
  const { orderId } = req.params;
  const userInfo = req.body;
  try {
    const order = await customerOrder.findByIdAndUpdate(orderId, {
      delivery_status: "Tìm Thấy Shipper",
      shipperInfo: userInfo,
      shipper_date: moment(Date.now()).format("LLL"),
    });

    responseReturn(res, 200, { message: "Nhận Đơn Thành Công!" });
  } catch (error) {
    console.log(error.message);
  }
};
