const categoryModel = require("../../models/categoryModel");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const brandModel = require("../../models/brandModel");

class categoryController {
  //them danh muc
  add_category = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "không tìm thấy..." });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim();
        const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categorys",
          });

          const name_category = await categoryModel.find({
            name: name,
          });

          if (result) {
            if (name_category.length) {
              responseReturn(res, 400, {
                error: "Tên danh mục đã tồn tại!",
              });
            } else {
              const category = await categoryModel.create({
                name,
                slug,
                image: result.url,
              });
              responseReturn(res, 201, {
                category,
                message: "Thêm danh mục thành công!",
              });
            }
          } else {
            responseReturn(res, 404, { error: "Upload hình ảnh thất bại!!" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Lỗi server!" });
        }
      }
    });
  };

  add_brand = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "không tìm thấy..." });
      } else {
        let { name } = fields;
        name = name.trim();
        try {
          const name_brand = await brandModel.find({
            name: name,
          });

          if (name_brand.length) {
            responseReturn(res, 400, {
              message: "Tên thương hiệu đã tồn tại!!!",
            });
          } else {
            const brand = await brandModel.create({
              name,
            });

            responseReturn(res, 201, {
              brand,
              message: "Thêm thương hiệu thành công!",
            });
          }
        } catch (error) {
          console.log(error.message);
          responseReturn(res, 500, { error: "Lỗi server!" });
        }
      }
    });
  };

  get_category = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else {
        const categorys = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_brand = async (req, res) => {
    const { page, searchValue, parPage } = req.query;

    try {
      let skipPage = "";
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const brand = await brandModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalBrand = await brandModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalBrand, brand });
      } else if (searchValue === "" && page && parPage) {
        const brand = await brandModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalBrand = await brandModel.find({}).countDocuments();
        responseReturn(res, 200, { totalBrand, brand });
      } else {
        const brand = await brandModel.find({}).sort({ createdAt: -1 });
        const totalBrand = await brandModel.find({}).countDocuments();
        responseReturn(res, 200, { totalBrand, brand });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // xoa danh muc
  xoa_category = async (req, res) => {
    const { _id } = req.params;

    try {
      await categoryModel.findByIdAndDelete(_id);
      responseReturn(res, 200, { message: "Xóa Thành Công!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  xoa_brand = async (req, res) => {
    const { _id } = req.params;

    try {
      await brandModel.findByIdAndDelete(_id);
      responseReturn(res, 200, { message: "Xóa Thành Công!" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new categoryController();
