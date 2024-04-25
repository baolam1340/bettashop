const { responseReturn } = require("../../utils/response");
const cardModel = require("../../models/cardModel");
const wishlistModel = require("../../models/wishlistModel");
const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");

const {
  mongo: { ObjectId },
} = require("mongoose");
class cardController {
  //them san pha vao gio hang
  add_to_card = async (req, res) => {
    const { userId, productId, quantity, size } = req.body;

    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        responseReturn(res, 404, {
          error: "Sản phẩm đã được thêm vào giỏ hàng!",
        });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
          size,
        });
        responseReturn(res, 201, {
          message: "Thêm vào giỏ hàng thành công!",
          product,
          size,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //
  get_card_products = async (req, res) => {
    const co = 5;
    const { userId } = req.params;
    console.log(userId);
    try {
      const card_products = await cardModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);

      let buy_product_item = 0;
      let calculatePrice = 0;
      let card_product_count = 0;
      const outOfStockProduct = card_products.filter(
        (p) => p.products[0].stock < p.quantity
      );
      for (let i = 0; i < outOfStockProduct.length; i++) {
        card_product_count = card_product_count + outOfStockProduct[i].quantity;
      }
      const stockProduct = card_products.filter(
        (p) => p.products[0].stock >= p.quantity
      );

      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        card_product_count = card_product_count + quantity;
        buy_product_item = buy_product_item + quantity;
        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      }

      let p = [];
      let unique = [
        ...new Set(stockProduct.map((p) => p.products[0].sellerId.toString())),
      ];

      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0];
          if (unique[i] === tempProduct.sellerId.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri =
                tempProduct.price -
                Math.floor((tempProduct.price * tempProduct.discount) / 100);
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * co) / 100);
            price = price + pri * stockProduct[j].quantity;
            p[i] = {
              sellerId: unique[i],
              shopName: tempProduct.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }

      const { sellerId } = req.params;
      const shopInfo = await sellerModel.find({ sellerId });

      responseReturn(res, 200, {
        card_products: p,
        price: calculatePrice,
        card_product_count,
        shipping_fee: calculatePrice > 500000 ? 0 : 50000,
        outOfStockProduct,
        buy_product_item,
        shopInfo,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // xoa san pham trong gio hang
  delete_card_product = async (req, res) => {
    const { card_id } = req.params;
    try {
      await cardModel.findByIdAndDelete(card_id);
      responseReturn(res, 200, {
        message: "Xóa thành công!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  quantity_inc = async (req, res) => {
    const { card_id } = req.params;
    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity + 1,
      });
      responseReturn(res, 200, {
        message: "Thành công!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  quantity_dec = async (req, res) => {
    const { card_id } = req.params;
    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity - 1,
      });
      responseReturn(res, 200, {
        message: "Thành công!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // tham san pham yeu thich
  add_to_wishlist = async (req, res) => {
    const { slug, userId } = req.body;
    try {
      const product = await wishlistModel.findOne({ slug });
      const userInfo = await customerModel.findById({ _id: userId });

      if (userInfo && product) {
        responseReturn(res, 400, { error: "Đã thêm!" });
      } else if (!userInfo) {
        responseReturn(res, 404, {
          message: "Cần đăng nhập để thêm vào yêu thích!!",
        });
      } else {
        await wishlistModel.create(req.body);
        responseReturn(res, 201, { message: "thêm vào yêu thích thành công!" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_wishlist_products = async (req, res) => {
    const { userId } = req.params;
    try {
      const wishlists = await wishlistModel.find({ userId });
      responseReturn(res, 200, { wishlistCount: wishlists.length, wishlists });
    } catch (error) {
      console.log(error.message);
    }
  };

  remove_wishlist = async (req, res) => {
    const { wishlistId } = req.params;
    try {
      await wishlistModel.findByIdAndDelete(wishlistId);
      responseReturn(res, 200, {
        message: "xóa yêu thích thành công!",
        wishlistId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new cardController();
