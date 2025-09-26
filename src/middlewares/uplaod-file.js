import multer from "multer";
import getName from "../../helpers/get-file-name.js";

export const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (request, file, cb) => {
    cb(null, `${getName()}${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (request, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
