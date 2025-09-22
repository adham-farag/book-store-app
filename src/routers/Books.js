import express from "express";
import authMW from "../middlewares/auth.js";
import * as bookscontroller from "../controllers/Books.js";
import bookValidation from "../validations/Books.js";

const router = express.Router();

router.post("/add", authMW, bookValidation, bookscontroller.add);

export default router;
