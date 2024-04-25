const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const productController = require("../../controllers/dashboard/productController");

router.post("/product-add", authMiddleware, productController.add_product);
router.get("/products-get", authMiddleware, productController.products_get);
router.get(
  "/product-get/:productId",
  authMiddleware,
  productController.product_get
);
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);

router.get("/nhacungcap", authMiddleware, productController.get_nhacungcap);

router.delete(
  "/xoa-nhacungcap/:_id",
  authMiddleware,
  productController.xoa_nhacungcap
);

router.post(
  "/submit-nhacungcap",
  authMiddleware,
  productController.submit_nhacungcap
);

router.post(
  "/product-image-update",
  authMiddleware,
  productController.product_image_update
);

router.delete(
  "/product-delete/:productId",
  authMiddleware,
  productController.delete_product
);

router.delete(
  "/delete-review/:_id",
  authMiddleware,
  productController.xoa_review
);

// router.put("/commit-review/:_id", productController.commit_review);

router.post(
  "/logproduct-update",
  authMiddleware,
  productController.logproduct_update
);

router.get(
  "/logproduct-get/:productId",
  authMiddleware,
  productController.get_logproduct
);

router.get(
  "/get-review-products",
  authMiddleware,
  productController.get_review_products
);

// thêm coupon sản phẩm

router.post(
  "/coupon/create-coupon-code",
  authMiddleware,
  productController.create_coupon_code
);

router.get(
  "/coupon/get-coupon/:id",
  authMiddleware,
  productController.get_coupon
);

router.delete(
  "/coupon/delete-coupon/:id",
  authMiddleware,
  productController.delete_coupon
);

router.get(
  "/coupon/get-coupon-value/:name",
  productController.get_coupon_value
);

// quan ly rui ro

router.post("/risk-management", productController.risk_management);
router.get(
  "/get-risk-management/:productId",
  productController.get_risk_management
);

module.exports = router;
