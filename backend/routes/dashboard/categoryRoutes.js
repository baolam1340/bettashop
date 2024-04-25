const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const categoryController = require("../../controllers/dashboard/categoryController");

router.post("/category-add", authMiddleware, categoryController.add_category);
router.get("/category-get", authMiddleware, categoryController.get_category);
router.delete("/xoa-category/:_id", authMiddleware, categoryController.xoa_category);

// ----------------- brand ----------------
router.post("/brand-add", authMiddleware, categoryController.add_brand);
router.get("/brand-get", authMiddleware, categoryController.get_brand);
router.delete("/xoa-brand/:_id", authMiddleware, categoryController.xoa_brand);

module.exports = router;
