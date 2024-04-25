const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// ----------- admin ------------
router.post("/admin-login", authControllers.admin_login);

// ------------ customer -------------

router.get("/get-all-customers", authControllers.get_all_customers);
router.delete("/xoa-customer/:customerId", authControllers.xoa_customer);

// ----------- nhan vien admin ------------
router.post("/nvadmin-login", authControllers.nvadmin_login);
router.post(
  "/nvadmin-register",
  authMiddleware,
  authControllers.nvadmin_register
);

// ----------- seller ------------
router.get("/get-user", authMiddleware, authControllers.getUser);
router.get("/get-nvadmin", authMiddleware, authControllers.getNvAdmin);
router.post("/seller-register", authControllers.seller_register);
router.post("/seller-login", authControllers.seller_login);
router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.profile_image_upload
);
router.post(
  "/profile-info-add",
  authMiddleware,
  authControllers.profile_info_add
);

// ----------- shipper ------------

router.post("/shipper-register", authControllers.shipper_register);
router.post("/shipper-login", authControllers.shipper_login);

router.get("/logout", authMiddleware, authControllers.logout);

module.exports = router;
