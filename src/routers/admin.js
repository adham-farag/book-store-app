const router = require("express").Router();
const controller = require("../controllers/admin");
const validation = require("../validations/admin");
const validationlogin = require("../validations/login");

router.post("", validation, controller.register);

router.post("/login", validationlogin, controller.login);

module.exports = router;
