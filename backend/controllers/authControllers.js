const adminModel = require("../models/adminModel");
const nvadminModel = require("../models/nhanvienAdminModel");
const sellerModel = require("../models/sellerModel");
const shipperModel = require("../models/shipperModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const customerModel = require("../models/customerModel");
const customerOrder = require("../models/customerOrder");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { responseReturn } = require("../utils/response");
const { createToken } = require("../utils/tokenCreate");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            exprires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: "Đăng nhập thành công!!!",
          });
        } else {
          responseReturn(res, 400, { error: "password sai!!" });
        }
      } else {
        responseReturn(res, 400, { error: "email không tìm thấy!!!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  nvadmin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const nvadmin = await nvadminModel.findOne({ email }).select("+password");

      if (nvadmin) {
        const match = await bcrypt.compare(password, nvadmin.password);
        if (match) {
          const token = await createToken({
            id: nvadmin.id,
            role: nvadmin.role,
          });
          res.cookie("accessToken", token, {
            exprires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: "Đăng nhập thành công!!!",
          });
        } else {
          responseReturn(res, 400, { error: "password sai!!" });
        }
      } else {
        responseReturn(res, 400, { error: "email không tìm thấy!!!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            exprires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Đăng nhập thành công!" });
        } else {
          responseReturn(res, 400, { error: "password sai!" });
        }
      } else {
        responseReturn(res, 400, { error: "email không tìm thấy!!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  shipper_login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
      const shipper = await shipperModel
        .findOne({ phoneNumber })
        .select("+password");
      if (shipper) {
        const match = await bcrypt.compare(password, shipper.password);
        if (match) {
          const token = await createToken({
            id: shipper.id,
            role: shipper.role,
          });
          res.cookie("accessToken", token, {
            exprires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Đăng nhập thành công!" });
        } else {
          responseReturn(res, 400, { error: "password sai!" });
        }
      } else {
        responseReturn(res, 400, { error: "Số điện thoại không tìm thấy!!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_register = async (req, res) => {
    const { name, email, password, district, sub_district } = req.body;

    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: "Email đã tồn tại!" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
          shopInfo: {
            district: district,
            sub_district: sub_district,
          },
        });
        await sellerCustomerModel.create({
          myId: "65e09606ddefc884e474eba3",
        });
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          exprires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        responseReturn(res, 201, { token, message: "Đăng ký thành công!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Lỗi Máy chủ!" });
    }
  };

  shipper_register = async (req, res) => {
    const { name, phoneNumber, cccd, address, password } = req.body;
    try {
      const getUser = await shipperModel.findOne({ phoneNumber });
      if (getUser) {
        responseReturn(res, 404, { error: "số điện thoại đã tồn tại!" });
      } else {
        const shipper = await shipperModel.create({
          name,
          phoneNumber,
          cccd,
          address,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        responseReturn(res, 201, { message: "Đăng ký thành công!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Lỗi Máy chủ!" });
    }
  };

  nvadmin_register = async (req, res) => {
    const { name, email, password, district, sub_district, role } = req.body;

    try {
      const getNvAdmin = await sellerModel.findOne({ email });

      if (getNvAdmin) {
        responseReturn(res, 404, { error: "Email đã tồn tại!" });
      } else {
        const nvAdmin = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          status: "active",
          role: role,
          shopInfo: {
            district: district,
            sub_district: sub_district,
          },
        });
        nvAdmin.save();

        await sellerCustomerModel.create({
          myId: "65e09606ddefc884e474eba3",
        });

        responseReturn(res, 201, {
          nvAdmin,
          message: "Tạo Tài Khoản Nhân Viên Thành Công!",
        });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: "Lỗi Máy chủ!" });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const count_order = await customerOrder
          .find({
            delivery_status: "Chưa Xử Lí",
          })
          .countDocuments();
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user, count_order });
      } else if (role === "nhanvien_admin") {
        const user = await nvadminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else if (role === "shipper") {
        const user = await shipperModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        const count_order = await customerOrder
          .find({
            delivery_status: "Chưa Xử Lí",
          })
          .countDocuments();
        responseReturn(res, 200, { userInfo: seller, count_order });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Lỗi Máy chủ!" });
    }
  };

  getNvAdmin = async (req, res) => {
    try {
      const nvadmin = await nvadminModel.find({
        role: "nhanvien_admin",
      });
      responseReturn(res, 200, { userInfo: nvadmin });
    } catch (error) {
      responseReturn(res, 500, { error: "Lỗi Máy chủ!" });
    }
  };

  profile_image_upload = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });
      const { image } = files;
      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",
        });
        if (result) {
          await sellerModel.findByIdAndUpdate(id, {
            image: result.url,
          });
          const userInfo = await sellerModel.findById(id);
          responseReturn(res, 201, {
            message: "Đăng ảnh thành công!!",
            userInfo,
          });
        } else {
          responseReturn(res, 404, { error: "Lỗi khi Đăng ảnh!" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  profile_info_add = async (req, res) => {
    const { division, district, shopName, sub_district } = req.body;
    const { id } = req;
    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          division,
          district,
          sub_district,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, {
        message: "Cập nhật thông tin thành công!!",
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      res.cookie("accessToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: "Đăng xuất thành công!" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // danh sach nguoi dung
  get_all_customers = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    try {
      let skipPage = "";
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const customers = await customerModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalCustomers = await customerModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();

        responseReturn(res, 200, { totalCustomers, customers });
      } else {
        const customers = await customerModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalCustomers = await customerModel.find({}).countDocuments();

        responseReturn(res, 200, { totalCustomers, customers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // xoa nguoi dung
  xoa_customer = async (req, res) => {
    const { customerId } = req.params;
    try {
      await customerModel.findByIdAndDelete(customerId);
      await sellerCustomerModel.updateOne(
        { myId: "65e09606ddefc884e474eba3" },
        {
          $pull: {
            myFriends: { fdId: customerId },
          },
        }
      );
      await responseReturn(res, 200, { message: "Xóa thành công!" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authControllers();
