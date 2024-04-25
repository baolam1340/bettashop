const router = require("express").Router();
const homeControllers = require("../../controllers/home/homeControllers");

router.get("/get-categorys", homeControllers.get_categorys);
router.get("/get-brands", homeControllers.get_brands);
router.get("/get-products", homeControllers.get_products);
router.get("/get-product/:slug", homeControllers.get_product);

// router.get("/recommendations/:id", homeControllers.recommendations);

router.get("/price-range-latest-product", homeControllers.price_range_product);
router.get("/query-products", homeControllers.query_products);

router.post("/customer/submit-review", homeControllers.submit_review);

router.post(
  "/customer/submit-review-order",
  homeControllers.submit_review_order
);

router.get(
  "/customer/check-review-customer/:customerId/:productId",
  homeControllers.check_review_customer
);

router.get("/customer/get-reviews/:productId", homeControllers.get_reviews);

module.exports = router;
