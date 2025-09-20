import express from "express";
import appError from "./middlewares/error.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.port || 3000;

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import booksRouters from "./routers/Books.js";
import adminRouters from "./routers/admin.js";

const basicURL = "/api/v2";

app.get("/help", (request, response) => {
  response.send("<h1>hello freind </h1>");
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

process.on("uncaughtException", (error) => {
  console.log("uncaughtException error::", error);
});
app.use(`${basicURL}/books`, booksRouters);
app.use(`${basicURL}/admins`, adminRouters);

app.use(appError);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
