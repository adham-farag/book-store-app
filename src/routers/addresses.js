import express from "express";
import authMW from "../middlewares/auth.js";
import * as addresseController from "../controllers/adresses.js";
import addressValidation from "../validations/Addresses.js";

const router = express.Router();

router.post("/add", authMW, addressValidation, addresseController.addAddresse);
router.delete("/delete", authMW, addresseController.removeAddress);

export default router;
