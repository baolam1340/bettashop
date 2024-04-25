const { response } = require("express");
const formidable = require("formidable");
const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utils/response");
const queryProducts = require("../../utils/queryProducts");
const reviewModel = require("../../models/reviewModel");
const brandModel = require("../../models/brandModel");
const customerModel = require("../../models/customerModel");
const reviewOrder = require("../../models/reviewOrder");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;
const {
  mongo: { ObjectId },
} = require("mongoose");
const customerOrder = require("../../models/customerOrder");
class homeControllers {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  get_categorys = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});
      responseReturn(res, 200, {
        categorys,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_brands = async (req, res) => {
    try {
      const brands = await brandModel.find({});

      responseReturn(res, 200, {
        brands,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // san pham moi nhat, san pham mua nhieu nhat, san pham gia cao nhat
  get_products = async (req, res) => {
    try {
      // tim san pham
      const search_products = await productModel.find({}).sort({
        createdAt: -1,
      });

      const products = await productModel.find({}).limit(16).sort({
        createdAt: -1,
      });
      const allProduct1 = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });
      //san pham moi nhat
      const latest_products = this.formateProduct(allProduct1);
      const allProduct2 = await productModel.find({}).limit(9).sort({
        rating: -1,
      });
      // san pham danh gia cao nhat nhieu nhat
      const topRated_products = this.formateProduct(allProduct2);
      const allProduct3 = await productModel.find({}).limit(9).sort({
        discount: -1,
      });
      //san pham giam gia nhieu nhat
      const discount_products = this.formateProduct(allProduct3);

      const relatedProducts = await productModel.find({}).limit(12).sort({
        rating: -1,
      });

      responseReturn(res, 200, {
        products,
        latest_products,
        topRated_products,
        discount_products,
        relatedProducts,
        search_products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_product = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await productModel.findOne({
        slug,
      });

      const relatedProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.id,
              },
            },
            {
              category: {
                $eq: product.category,
              },
            },
          ],
        })
        .limit(20);
      const moreProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.id,
              },
            },
            {
              category: {
                $eq: product.category,
              },
            },
          ],
        })
        .limit(3);

      responseReturn(res, 200, {
        product,
        relatedProducts,
        moreProducts,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  price_range_product = async (req, res) => {
    try {
      const priceRange = {
        low: 0,
        high: 0,
      };
      const products = await productModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });

      const latest_products = this.formateProduct(products);
      const getForPrice = await productModel.find({}).sort({ price: 1 });

      if (getForPrice.length > 0) {
        priceRange.high = getForPrice[getForPrice.length - 1].price;
        priceRange.low = getForPrice[0].price;
      }
      responseReturn(res, 200, { latest_products, priceRange });
    } catch (error) {
      console.log(error.message);
    }
  };

  query_products = async (req, res) => {
    const parPage = 12;
    req.query.parPage = parPage;
    try {
      const search_products = await productModel.find({}).sort({
        createdAt: -1,
      });

      const products = await productModel.find({}).sort({
        createdAt: -1,
      });
      const totalProduct = new queryProducts(products, req.query)
        .categoryQuery()
        .categorySex()
        .categoryBrand()
        .searchQuery()
        .priceQuery()
        .ratingQuery()
        .sortByPrice()
        .countProducts();

      const result = new queryProducts(products, req.query)
        .categoryQuery()
        .categorySex()
        .categoryBrand()
        .searchQuery()
        .ratingQuery()
        .priceQuery()
        .sortByPrice()
        .skip()
        .limit()
        .getProducts();

      responseReturn(res, 200, {
        products: result,
        totalProduct,
        parPage,
        search_products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  submit_review = async (req, res) => {
    const { name, rating, review, productId } = req.body;

    try {
      await reviewModel.create({
        productId,
        name,
        rating,
        review,
        date: moment(Date.now()).format("LL"),
      });

      let rat = 0;
      const reviews = await reviewModel.find({
        productId,
      });
      for (let i = 0; i < reviews.length; i++) {
        rat = rat + reviews[i].rating;
      }
      let productRating = 0;

      if (reviews.length !== 0) {
        productRating = (rat / reviews.length).toFixed(1);
      }

      await productModel.findByIdAndUpdate(productId, {
        rating: productRating,
      });

      responseReturn(res, 201, {
        message: "Đánh giá thành công!!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  get_reviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    const limit = 5;
    const skipPage = limit * (pageNo - 1);
    try {
      let getRating = await reviewModel.aggregate([
        {
          $match: {
            productId: {
              $eq: new ObjectId(productId),
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);
      const rating_review = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];
      for (let i = 0; i < rating_review.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (rating_review[i].rating === getRating[j]._id) {
            rating_review[i].sum = getRating[j].count;
            break;
          }
        }
      }
      const getAll = await reviewModel.find({ productId });

      const reviews = await reviewModel
        .find({
          productId,
        })
        .skip(skipPage)
        .limit(limit)
        .sort({ createdAt: -1 });

      responseReturn(res, 200, {
        reviews: reviews,
        totalReview: getAll.length,
        rating_review,
      });
    } catch (error) {
      console.log(error);
    }
  };

  submit_review_order = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let { name, review, rating, orderId } = field;
      const { images, videos } = files;
      name = name.trim();

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];
        if (images?.length === undefined) {
          const result = await cloudinary.uploader.upload(images.filepath, {
            folder: "review_order",
          });
          allImageUrl = [...allImageUrl, result.url];
        } else {
          for (let i = 0; i < images?.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              {
                folder: "review_order",
              }
            );
            allImageUrl = [...allImageUrl, result.url];
          }
        }

        let allVideoUrl = [];

        if (videos?.length === undefined) {
          const result = await cloudinary.uploader.upload(videos.filepath, {
            resource_type: "video",
            folder: "review_order",
          });
          allVideoUrl = [...allVideoUrl, result.url];
        } else {
          for (let i = 0; i < videos?.length; i++) {
            const result = await cloudinary.uploader.upload(
              videos[i].filepath,
              {
                resource_type: "video",
                folder: "review_order",
              }
            );
            allVideoUrl = [...allVideoUrl, result.url];
          }
        }

        await reviewOrder.create({
          orderId: orderId,
          name,
          review,
          rating,
          images: allImageUrl,
          videos: allVideoUrl,
        });

        responseReturn(res, 201, {
          message: "đánh giá đơn hàng thành công!",
        });
      } catch (error) {
        responseReturn(res, 500, "loi server");
        console.log(error.message);
      }

      if (err) {
        reject(err);
        return;
      }
    });
  };

  check_review_customer = async (req, res) => {
    const { customerId, productId } = req.params;
    try {
      if (customerId != "undefined") {
        const userInfo = await customerModel.findById(customerId);
        if (userInfo) {
          const count = await customerOrder.countDocuments({
            customerId: new ObjectId(customerId),
            products: { $elemMatch: { _id: productId } },
          });

          responseReturn(res, 200, { count: count && count > 0 ? count : 0 });
        }
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
      console.error("Error checking customer purchase:", error.message);
    }
  };

  // recommendations = async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const customer = await customerModel.findById(id);
  //     if (!customer) {
  //       return res.status(404).json({ message: "Không tìm thấy người dùng" });
  //     }

  //     const recommendations = await productModel.aggregate([
  //       {
  //         $match: {},
  //       },
  //       {
  //         $addFields: {
  //           distance: {
  //             $sqrt: {
  //               $sum: customer.sex === "$sex" ? 0 : 1, // Khoảng cách giữa giới tính người dùng và sản phẩm
  //               // $pow: [{ $subtract: ["$price", customer.price] }, 2], // Ví dụ về khoảng cách với giá
  //               // Thêm các trường khoảng cách cho các thuộc tính khác tùy ý
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $sort: { distance: 1 }, // Sắp xếp theo khoảng cách tăng dần
  //       },
  //       {
  //         $limit: 10, // Giới hạn số lượng sản phẩm trả về
  //       },
  //     ]);
  //   } catch (error) {}
  // };
}

module.exports = new homeControllers();
