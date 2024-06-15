const express = require("express");
const { categoryController, productController } = require('../controllers')

const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/category/thumbnail");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/category", upload.single("thumbnail"), categoryController.store);
router.get("/category", categoryController.index);
router.delete("/category", categoryController.delete);
router.put("/category/:id", categoryController.update);


/*router.post("/product", productController.store);
router.get("/product", productController.index);
router.delete("/product", productController.delete);
router.delete("/product", productController.delete)*/

module.exports = router;     