const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  get_seller_dashboard_data,
  get_admin_dashboard_data,
  thongke,
  get_shipper_new_order,
  comfirm_order_shipper
} = require("../../controllers/dashboard/dashboardIndexController");

router.get(
  "/seller/get-dashboard-index-data/:sellerId",
  authMiddleware,
  get_seller_dashboard_data
);

router.get("/seller/dashboard-thongke", authMiddleware, thongke);

router.get(
  "/admin/get-dashboard-index-data",
  authMiddleware,
  get_admin_dashboard_data
);

router.get(
  "/shipper/get-shipper-new-order/:id",
  authMiddleware,
  get_shipper_new_order
);

router.put(
  "/shipper/comfirm-order/:orderId",
  authMiddleware,
  comfirm_order_shipper
);

module.exports = router;
