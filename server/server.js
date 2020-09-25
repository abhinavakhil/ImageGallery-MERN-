const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

const app = express();

const api = require("../server/router");

mongoose.Promise = global.Promise;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database conncted Successfully!");
    },
    (error) => {
      console.log("Database could not be connected: " + error);
    }
  );

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use("/public", express.static("public"));

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
