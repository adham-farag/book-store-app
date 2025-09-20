import express from "express";
import adminvalidation from "../validations/admin.js";
import * as admincontrollers from "../controllers/admin.js";
import loginValidation from "../validations/login.js";

const router = express.Router();

router.post("/register", adminvalidation, admincontrollers.add);
router.post("/login", loginValidation, admincontrollers.login);
router.put("/update/:id", adminvalidation, admincontrollers.update);
router.delete("/delete/:id", admincontrollers.deleteAdmin);
router.patch("/restore/:id", admincontrollers.restore);

export default router;
