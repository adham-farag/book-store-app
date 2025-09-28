import express from "express";

import authMW from "../middlewares/auth.js";
import * as bookscontroller from "../controllers/Books.js";
import bookValidation from "../validations/Books.js";
import { upload } from "../middlewares/uplaod-file.js";
import normalize from "../middlewares/normalizeBody.js";
import UbookValidation from "../validations/updateValidatio.js";

const router = express.Router();

router.get("/select", authMW, bookscontroller.selectAll);

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
  bookscontroller.register
);

router.post("/update/:id", authMW, UbookValidation, bookscontroller.update);
router.delete("/delete/:id", authMW, bookscontroller.remove);
router.patch("/restore/:id", authMW, bookscontroller.restore);

export default router;
