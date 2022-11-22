import express from "express";
import multer from "multer";
import path from "path";

import {
  handleUpdLoadFile,
  handleUpdLoadMultipleFile,
} from "../controllers/UploadFile2.js";

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/images");
  },

  // By default, multer removes file extensions so let's add them back
  // filename: function (req, file, cb) {
  //   cb(
  //     null,
  //     file.fieldname + "-" + Date.now() + path.extname(file.originalname)
  //   );
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 10/20/2020.png
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// let upload = multer({
//   storage: storage,
//   fileFilter: imageFilter,
// });

const maxSize = 5 * 1024 * 1024;

let uploadSingle = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
}).single("file");

let uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("MultipleFiles", 10);

let UploadRoute = (app) => {
  //Single file
  router.post(
    "/upload-single",
    (req, res, next) => {
      uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // res.send(err);
          return res.status(404).json({ msg: "File to large upload failed" });
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    handleUpdLoadFile
  );

  //Multiple files
  router.post(
    "/upload-multiple",
    (req, res, next) => {
      uploadMultipleFiles(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          // handle multer file limit error here
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          // make sure to call next() if all was well
          next();
        }
      });
    },
    handleUpdLoadMultipleFile
  );

  return app.use("/Upload", router);
};

module.exports = UploadRoute;
