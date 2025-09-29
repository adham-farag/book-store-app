import express from "express";

import * as customerController from "../controllers/customer.js";
import authMW from "../middlewares/auth.js";
import customervalidation from "../validations/customer.js";
import loginValidation from "../validations/login.js";

const router = express.Router();

router.post("/register", customervalidation, customerController.register);
router.post("/login", loginValidation, customerController.login);
router.post("/refreshToken", customerController.refreshToken);

export default router;
