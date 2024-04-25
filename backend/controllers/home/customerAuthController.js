const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utils/response");
const { createToken } = require("../../utils/tokenCreate");
const bcrypt = require("bcrypt");

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email đã tồn tại!" });
      } else if (name === "") {
        responseReturn(res, 401, { error: "vui long dien day du!" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          phoneNumber,
          sex: "Nam",
          password: await bcrypt.hash(password, 10),
          method: "menualy",
          email_verified: false,
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          sex: "Nam",
          email: createCustomer.email,
          phoneNumber: createCustomer.phoneNumber,
          method: createCustomer.method,
          email_verified: false,
          addresses: [
            {
              country: "",
              city: "",
              address1: "",
              addressType: "",
            },
          ],
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Đăng ký thành công!", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            sex: customer.sex,
            method: customer.method,
            phoneNumber: customer.phoneNumber,
            addresses: customer.addresses,
            email_verified: false,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: "Đăng nhập thành công!", token });
        } else {
          responseReturn(res, 404, { error: "Sai password!" });
        }
      } else {
        responseReturn(res, 404, { error: "Email không tìm thấy!!" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_gg_login = async (req, res) => {
    const email = req.body.data.email;
    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        const token = await createToken({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          sex: customer?.sex,
          method: customer.method,
          phoneNumber: customer.phoneNumber,
          addresses: customer.addresses,
          email_verified: true,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Đăng nhập thành công!", token });
      } else {
        const createCustomer = await customerModel.create({
          name: req.body.data.name.trim(),
          email: req.body.data.email.trim(),
          phoneNumber: "0",
          sex: "Nam",
          password: "1",
          method: "menualy",
          email_verified: true,
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          sex: createCustomer.sex,
          email: createCustomer.email,
          method: createCustomer.method,
          phoneNumber: createCustomer.phoneNumber,
          email_verified: true,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Đăng nhập thành công!", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_logout = async (req, res) => {
    res.cookie("customerToken", "", {
      expires: new Date(Date.now()),
    });
    responseReturn(res, 200, { message: "Đăng xuất thành công!" });
  };

  change_password = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
      const user = await customerModel.findById(req.id).select("+password");

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        responseReturn(res, 401, { message: "Mật khẩu hiện tại không đúng" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      responseReturn(res, 200, {
        message: "Mật khẩu đã được thay đổi thành công",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  updateUserAddress = async (req, res) => {
    const { addressType } = req.body;
    try {
      const userInfo = await customerModel.findById(req.id);

      const sameTypeAddress = userInfo.addresses.find(
        (address) => address.addressType === addressType
      );

      if (sameTypeAddress) {
        responseReturn(res, 404, {
          message: `Địa chỉ ${addressType} Đã tồn tại!! `,
        });
        return;
      }

      const existsAddress = userInfo.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        userInfo.addresses.push(req.body);
      }

      if (userInfo.email_verified) {
        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          method: userInfo.method,
          email_verified: true,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        userInfo.save();

        responseReturn(res, 201, {
          message: "Thêm địa chỉ thành công!",
          token,
        });
      } else {
        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          method: userInfo.method,
          email_verified: false,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        userInfo.save();

        responseReturn(res, 201, {
          message: "Thêm địa chỉ thành công!",
          token,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteUserAddress = async (req, res) => {
    const addressId = req.params.id;
    const userId = req.id;

    try {
      await customerModel.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const userInfo = await customerModel.findById(userId);

      if (userInfo.email_verified) {
        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          method: userInfo.method,
          email_verified: true,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        userInfo.save();

        responseReturn(res, 201, {
          message: "xóa thành công!",
          token,
        });
      } else {
        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          method: userInfo.method,
          email_verified: false,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        userInfo.save();

        responseReturn(res, 201, {
          message: "xóa thành công!",
          token,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  updateUserProfile = async (req, res) => {
    const { email, phoneNumber, name, sex } = req.body;
    try {
      const userInfo = await customerModel.findOne({ email });

      if (!userInfo) {
        responseReturn(res, 404, { message: "Không tìm thấy người dùng này!" });
        return;
      }
      if (userInfo.email_verified) {
        userInfo.name = name;
        userInfo.email = email;
        userInfo.phoneNumber = phoneNumber;
        userInfo.sex = sex;

        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          sex: userInfo.sex,
          method: userInfo.method,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
          email_verified: true,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await userInfo.save();

        responseReturn(res, 201, {
          message: "Cập nhật profile thành công!!",
          token,
        });
      } else {
        userInfo.name = name;
        userInfo.email = email;
        userInfo.sex = sex;
        userInfo.phoneNumber = phoneNumber;

        const token = await createToken({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          sex: userInfo.sex,
          method: userInfo.method,
          phoneNumber: userInfo.phoneNumber,
          addresses: userInfo.addresses,
          email_verified: false,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await userInfo.save();

        responseReturn(res, 201, {
          message: "Cập nhật profile thành công!!",
          token,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new customerAuthController();
