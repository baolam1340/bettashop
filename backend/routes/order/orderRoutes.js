const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// ---- customer ----

router.post("/home/order/place-order", orderController.place_order);
router.get(
  "/home/customer/get-dashboard-data/:userId",
  orderController.get_customer_dashboard_data
);
router.get("/home/customer/get-orders/:status", orderController.get_orders);
router.get(
  "/home/customer/get-all-orders/:customerId",
  orderController.get_all_orders
);

router.get("/home/customer/get-order/:orderId", orderController.get_order);
router.get(
  "/home/customer/get-order-review/:orderId",
  orderController.get_detail_review_order
);
router.post("/order/create-payment", orderController.create_payment);
router.post("/order/confirm/:orderId", orderController.order_confirm);
router.put("/home/customer/huy-order/:orderId", orderController.huy_order);
router.post("/home/customer/submit-request", orderController.submit_request);
router.get("/home/customer/get-all-coupon", orderController.get_all_coupon);

// --- admin ----

router.get("/admin/orders", orderController.get_admin_orders);
router.get("/admin/order/:orderId", orderController.get_admin_order);
router.put(
  "/admin/order-status/update/:orderId",
  orderController.admin_order_status_update
);

// ---- seller -----

router.get("/seller/orders", orderController.get_seller_orders);
router.get(
  "/seller/order/:_id",
  authMiddleware,
  orderController.get_seller_order
);
router.put(
  "/seller/order-status/update/:_id",
  orderController.seller_order_status_update
);

router.get("/seller/get-request", orderController.get_request);
router.get(
  "/seller/get-all-review-order",
  orderController.get_all_review_order
);
router.get(
  "/seller/get-detail-review-order/:orderId",
  orderController.get_detail_review_order
);

module.exports = router;
