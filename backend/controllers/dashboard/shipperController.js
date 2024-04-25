const { responseReturn } = require("../../utils/response");
const shipperModel = require("../../models/shipperModel");
class shipperController {
  get_all_shipper = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    try {
      let skipPage = "";
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const shippers = await shipperModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalShipper = await shipperModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();

        responseReturn(res, 200, { totalShipper, shippers });
      } else {
        const shippers = await shipperModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalShipper = await shipperModel.find({}).countDocuments();

        responseReturn(res, 200, { totalShipper, shippers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  get_shipper = async (req, res) => {
    const { shipperId } = req.params;
    try {
      const shipper = await shipperModel.findById(shipperId);
      responseReturn(res, 200, { shipper });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  xoa_shipper = async (req, res) => {
    const { id } = req.params;
    try {
      await shipperModel.findByIdAndDelete(id);
      responseReturn(res, 200, { message: "Xóa Thành Công!" });
    } catch (error) {
      responseReturn(res, 500, { message: "Lỗi Máy Chủ!" });
    }
  };

  update_profile_shipper = async (req, res) => {
    const { shipperId, name, phoneNumber, cccd, address } = req.body;
    try {
      await shipperModel.findByIdAndUpdate(shipperId, {
        name: name,
        phoneNumber: phoneNumber,
        cccd: cccd,
        address: address,
      });
      responseReturn(res, 200, { message: "Cập Nhật Thành Công!" });
    } catch (error) {
      responseReturn(res, 500, { message: "Lỗi Máy Chủ!" });
    }
  };
}

module.exports = new shipperController();
