const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const shipperController = require("../../controllers/dashboard/shipperController");

router.get(
  "/get-all-shipper",
  authMiddleware,
  shipperController.get_all_shipper
);

router.get(
  "/get-shipper/:shipperId",
  authMiddleware,
  shipperController.get_shipper
);

router.delete(
  "/xoa-shipper/:id",
  shipperController.xoa_shipper
);

router.post(
  "/update-profile-shipper",
  shipperController.update_profile_shipper
);

module.exports = router;
