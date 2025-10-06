import express from "express";

import * as customerController from "../controllers/customer.js";
import authMW from "../middlewares/auth.js";
import customervalidation from "../validations/customer.js";
import loginValidation from "../validations/login.js";
import personValidation from "../validations/person-validation.js";

const router = express.Router();

router.get("/getProfile/:pageId", customerController.getProfile);
router.post("/register", customervalidation, customerController.register);
router.post("/login", loginValidation, customerController.login);
router.post("/refreshToken", customerController.refreshToken);
router.get("/logout", customerController.logout);
router.delete("/remove", authMW, customerController.remove);
router.patch("/restore", authMW, customerController.restore);
router.put("/update", authMW, personValidation, customerController.update);

router.get("/selectCart", authMW, customerController.selectCart);
router.post("/addTocart", authMW, customerController.addToCart);
router.put("/updateCart/:productId", authMW, customerController.updateCart);
router.delete(
  "/removeFromCart/:productId",
  authMW,
  customerController.removeFromCart
);

export default router;
