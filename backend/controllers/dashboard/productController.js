const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
const logProductModel = require("../../models/logProduct");
const { responseReturn } = require("../../utils/response");
const couponModel = require("../../models/couponModel");
const reviewModel = require("../../models/reviewModel");
const nhacungcapModel = require("../../models/nhacungcapModel");
const riskModel = require("../../models/riskModel");
const moment = require("moment");
const {
  mongo: { ObjectId },
} = require("mongoose");
class productController {
  // them san pham
  add_product = async (req, res) => {
    const id = "65e09606ddefc884e474eba3";
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        color,
        sex,
        size,
        price,
        discount,
        shopName,
      } = field;

      const sizeArray = size.split(",").map((item) => String(item.trim()));

      const { images } = files;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }

        const name_product = await productModel.find({
          name: name,
        });

        if (name_product.length) {
          responseReturn(res, 201, { message: "Tên sản phẩm đã tồn tại!" });
        } else {
          await productModel.create({
            sellerId: id,
            name,
            slug,
            shopName,
            category: category.trim(),
            sex,
            color,
            size: sizeArray,
            description: description.trim(),
            stock: parseInt(stock),
            price: parseInt(price),
            discount: parseInt(discount),
            images: allImageUrl,
          });
          responseReturn(res, 201, { message: "Thêm sản phẩm thành công!" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: "Cần Điền Đầy Đủ" });
      }
    });
  };
  //lay tat ca san pham
  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        const result = await productModel.aggregate([
          {
            $group: {
              _id: null,
              totalThiethai: { $sum: "$thiethai" },
            },
          },
        ]);
        const result_soluong = await productModel.aggregate([
          {
            $group: {
              _id: null,
              total_soluong: { $sum: "$soluong_thiethai" },
            },
          },
        ]);
        responseReturn(res, 200, {
          totalProduct,
          products,
          result,
          result_soluong,
        });
      } else {
        const products = await productModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel.find({}).countDocuments();
        const result = await productModel.aggregate([
          {
            $group: {
              _id: null,
              totalThiethai: { $sum: "$thiethai" },
            },
          },
        ]);
        const result_soluong = await productModel.aggregate([
          {
            $group: {
              _id: null,
              total_soluong: { $sum: "$soluong_thiethai" },
            },
          },
        ]);
        responseReturn(res, 200, {
          totalProduct,
          products,
          result: result[0].totalThiethai,
          result_soluong: result_soluong[0].total_soluong,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { productId } = req.params;
    let updateDate = {
      updatedAt: new Date(),
    };
    try {
      const product = await productModel.findById(productId);
      const get_all_nhacungcap = await nhacungcapModel.find({});

      responseReturn(res, 200, { product, updateDate, get_all_nhacungcap });
    } catch (error) {
      console.log(error.message);
    }
  };

  product_update = async (req, res) => {
    let {
      name,
      description,
      discount,
      price,
      brand,
      productId,
      size,
      color,
      sex,
      stock,
    } = req.body;

    const sizes = [];
    for (let i = 0; i < size.length; i++) {
      let a = size[i];
      for (let j = 0; j < a.length; j++) {
        sizes.push(a[j]);
      }
    }

    name = name.trim();
    const slug = name.split(" ").join("-");
    const p = await productModel.findById(productId);
    const version = p.__v;
    try {
      const product = await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        productId,
        size: sizes,
        color,
        stock,
        slug,
        sex,
        __v: version + 1,
      });
      {
        /** chinh sua san pham */
      }
      responseReturn(res, 200, {
        product,
        message: "Update sản phẩm thành công!",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await productModel.findByIdAndUpdate(productId, {
              images,
            });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Update hình ảnh sản phẩm thành công!",
            });
          } else {
            responseReturn(res, 404, { error: "Upload hình ảnh thất bại!" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };

  delete_product = async (req, res) => {
    const { productId } = req.params;
    try {
      await productModel.findByIdAndDelete(productId);
      responseReturn(res, 200, { message: "Xóa SP thành công!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  logproduct_update = async (req, res) => {
    const { productId, fullname, stock, price, note, ten_nhacungcap } =
      req.body;
    try {
      await logProductModel.create({
        productId,
        fullname: fullname.trim(),
        stock: parseInt(stock),
        price: parseInt(price),
        ten_nhacungcap: ten_nhacungcap.trim(),
        note: note.trim(),
        date: moment(Date.now()).format("LLL"),
      });

      const product = await productModel.findById(productId);

      let stock_product = product.stock;

      let add_warehouse = 0;
      let update_price = 0;

      const log = await logProductModel.find({ productId });

      update_price = update_price + log.price;

      for (let i = 0; i < log.length; i++) {
        add_warehouse = log[i].stock;
        update_price = log[i].price;
      }
      add_warehouse = add_warehouse + stock_product;

      await productModel.findByIdAndUpdate(productId, {
        stock: add_warehouse,
        price: update_price,
      });

      responseReturn(res, 200, { message: "Lập phiếu thành công!!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_logproduct = async (req, res) => {
    const productId = req.params.productId;
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
        const logProduct = await logProductModel
          .find({
            $text: { $search: searchValue },
            // fullname: searchValue,
            productId: productId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totallogProduct = await logProductModel
          .find({
            $text: { $search: searchValue },
            // fullname: searchValue,
            productId: productId,
          })
          .countDocuments();

        responseReturn(res, 200, { totallogProduct, logProduct });
      } else {
        const logProduct = await logProductModel
          .find({ productId: productId })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totallogProduct = await logProductModel
          .find({ productId: productId })
          .countDocuments();

        responseReturn(res, 200, { totallogProduct, logProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  checkCouponExpiration = async (req, res, next) => {
    try {
      const coupon = await couponModel.findOne({
        name: req.body.name,
      });

      if (!coupon) {
        return responseReturn(res, 400, {
          message: "Mã giảm giá không tồn tại!",
        });
      }

      const currentDate = new Date();
      const expirationDate = new Date(coupon.endDate);

      if (currentDate > expirationDate) {
        return responseReturn(res, 400, { message: "Mã giảm giá đã hết hạn!" });
      }

      // Gọi next để tiếp tục xử lý các middleware hoặc route khác
      next();
    } catch (error) {
      return responseReturn(res, 500, {
        message: "Đã xảy ra lỗi khi kiểm tra mã giảm giá!",
      });
    }
  };

  create_coupon_code = async (req, res) => {
    try {
      const isCoupounCodeExists = await couponModel.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        responseReturn(res, 400, { message: "Mã giảm giá đã tồn tại!" });
      }

      const coupounCode = await couponModel.create(req.body);

      responseReturn(res, 200, { coupounCode });
    } catch (error) {
      responseReturn(res, 500, { message: "Vui lòng nhập đầy đủ thông tin!" });
    }
  };

  get_coupon = async (req, res) => {
    try {
      const couponCodes = await couponModel.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  delete_coupon = async (req, res) => {
    try {
      const couponCode = await couponModel.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        responseReturn(res, 500, { message: "Mã giảm giá không tồn tại!" });
      }
      res.status(201).json({
        success: true,
        message: "Đã xóa mã giảm giá thành công!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_coupon_value = async (req, res) => {
    try {
      const couponCode = await couponModel.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_review_products = async (req, res) => {
    try {
      let product_find = [];
      const review = await reviewModel.find({}).sort({ createdAt: -1 });
      for (let i = 0; i < review.length; i++) {
        const product = await productModel.findOne({
          _id: new ObjectId(review[i].productId),
        });
        if (product) {
          const productReview = {
            product: product,
            review: review[i],
          };
          product_find.push(productReview);
        }
      }
      const total_product_find = product_find.length;
      responseReturn(res, 200, { product_find, total_product_find });
    } catch (error) {
      console.log(error.message);
    }
  };

  xoa_review = async (req, res) => {
    const { _id } = req.params;
    try {
      let delete_rating = 0;
      const review = await reviewModel.findById(_id);

      delete_rating = review.rating;

      const product_Id = review.productId.toString();

      let rat = 0;
      const reviews = await reviewModel.find({
        productId: new ObjectId(review.productId),
      });

      for (let i = 0; i < reviews.length; i++) {
        rat = rat + reviews[i].rating;
      }

      let productRating = 0;

      if (reviews.length !== 0) {
        if (reviews.length === 1) {
          productRating = 0;
        } else {
          productRating = (
            (rat - delete_rating) /
            (reviews.length - 1)
          ).toFixed(1);
        }
      }

      await productModel.findByIdAndUpdate(product_Id, {
        rating: productRating,
      });

      await reviewModel.findByIdAndDelete(_id);

      responseReturn(res, 200, { message: "Xóa thành công!!!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  // commit_review = async (req, res) => {
  //   const { _id } = req.params;
  //   try {
  //     const comment = await reviewModel.findById(_id);

  //     if (!comment) {
  //       return res.status(404).json({ message: "Không tìm thấy bình luận." });
  //     }
  //     comment.approved = true;
  //     await comment.save();

  //     res.json({ message: "Bình luận đã được duyệt thành công." });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Đã xảy ra lỗi." });
  //   }
  // };
  get_nhacungcap = async (req, res) => {
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
        const all_nhacungcap = await nhacungcapModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const count_nhacungcap = await nhacungcapModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();

        responseReturn(res, 200, { count_nhacungcap, all_nhacungcap });
      } else {
        const all_nhacungcap = await nhacungcapModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const count_nhacungcap = await nhacungcapModel
          .find({})
          .countDocuments();

        responseReturn(res, 200, { count_nhacungcap, all_nhacungcap });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  submit_nhacungcap = async (req, res) => {
    const { name, email, phoneNumber, address, status } = req.body;
    try {
      const check = await nhacungcapModel.findOne({
        name: name,
      });
      if (check) {
        responseReturn(res, 404, {
          message: "đã có tên nhà cung cấp này rồi!!!",
        });
      } else {
        await nhacungcapModel.create({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          status: status,
        });
      }

      responseReturn(res, 200, { message: "thêm nhà cung cấp thành công!!" });
    } catch (error) {
      responseReturn(res, 500, { message: "Lỗi máy chủ" });
    }
  };

  xoa_nhacungcap = async (req, res) => {
    const { _id } = req.params;
    try {
      await nhacungcapModel.findByIdAndDelete(_id);
      responseReturn(res, 200, { message: "xóa thành công!!!" });
    } catch (error) {
      responseReturn(res, 500, { message: "Lỗi máy chủ" });
    }
  };

  // quan ly rui ro
  risk_management = async (req, res) => {
    const { productId, reason, quantity } = req.body;
    try {
      const product = await productModel.findById(productId);
      const stock_product = product.stock;
      const price_product = product.price;

      const tong_ca_hientai = product.soluong_thiethai;
      const thiethai_soluong = quantity + tong_ca_hientai;

      const thiethai_hientai = product.thiethai;
      const thiethai_product = quantity * price_product + thiethai_hientai;
      const risk_quantity = stock_product - quantity;

      if (stock_product > 0) {
        const risk = await riskModel.create({
          productId: productId,
          reason: reason,
          quantity: quantity,
        });
        const product_update = await productModel.findByIdAndUpdate(productId, {
          stock: risk_quantity,
          thiethai: thiethai_product,
          soluong_thiethai: thiethai_soluong,
        });
        responseReturn(res, 200, { message: "Cập nhật thành công!!!" });
      }
    } catch (error) {
      responseReturn(res, 404, { error: "Số Lượng Đã Hết!!!" });
    }
  };

  get_risk_management = async (req, res) => {
    const { productId } = req.params;

    try {
      const risk = await riskModel.find({
        productId: new ObjectId(productId),
      });

      responseReturn(res, 200, { risk });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new productController();
