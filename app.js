require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dbDataSource = require("./api/models/dataSource");

dbDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.all("*", (req, res, next) => {
  const err = new Error(`Can't fine ${req.originalUrl} on this server!`);

  err.statusCode = 404;

  next(err);
});

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Server Listening to request on 127.0.0.1:${PORT} 🚀🚀🚀`);
});
