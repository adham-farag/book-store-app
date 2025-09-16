const express = require("express");
const router = express.Router();
const controller = require("../controllers/Books");
const bookvalidation = require("../validations/Books");
const auth = require("../middlewares/auth");

router.get("", controller.selectBook);
router.post("", auth, bookvalidation, controller.addBook);
router.put("/:id", auth, bookvalidation, controller.updateBook);
router.delete("/:id", auth, bookvalidation, controller.deletebook);

module.exports = router;
