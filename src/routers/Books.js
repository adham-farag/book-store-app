import express from "express";

import authMW from "../middlewares/auth.js";
import * as bookscontroller from "../controllers/Books.js";
import bookValidation from "../validations/Books.js";
import { upload } from "../middlewares/uplaod-file.js";
import normalize from "../middlewares/normalizeBody.js";

const router = express.Router();

router.post(
  "/add",
  authMW,
  upload.single("image"),
  (req, res, next) => {
    req.body.image = req.file.path;
    console.log("file::", req.file);
    next();
  },
  normalize,
  bookValidation,
  bookscontroller.add
);

export default router;
