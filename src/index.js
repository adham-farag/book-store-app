const express = require("express");
const app = express();
const port = process.env.port || 3000;

const helmet = require("helmet");
const cors = require("cors");
const booksRouters = require("./routers/Books");
const adminRouters = require("./routers/admin");

app.get("/help", (request, response) => {
  response.send("<h1>hello freind </h1>");
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/api/books", booksRouters);
app.use("/api/admin", adminRouters);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
