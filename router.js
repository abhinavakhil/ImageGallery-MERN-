const express = require("express");
const multer = require("multer");
const path = require("path");

// const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const User = require("./userModel");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    // const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // const extname = filetypes.test(
    //   path.extname(file.originalname).toLowerCase()
    // );
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/image-upload", upload.single("image"), (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  const user = new User({
    imageName: req.body.imageName,
    userName: req.body.userName,
    image: `uploads/${req.file.filename}`,
    lat: req.body.lat,
    long: req.body.long,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Image Uploaded Successfully!",
        data: {
          imageData: result.image,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      imageData: data,
    });
  });
});

module.exports = router;
