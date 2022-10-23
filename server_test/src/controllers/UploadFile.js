// import thu vien
import multer from "multer";
import path, { extname } from "path";

// Upload images controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, Date.now() + path.extname(file.originalname)) // 10/20/2020.png
    cb(null, "src/assets/images"); // 10/20/2020.png
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 10/20/2020.png
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" }, // 10000000 = 10mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const minType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (minType && extname) {
      return cb(null, true);
    }
    cb("Give proper file format to upload");
  },
}).single("image");

const uploads = multer({
  storage: storage,
  limits: { fileSize: "10000000" }, // 10000000 = 10mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const minType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (minType && extname) {
      return cb(null, true);
    }
    cb("Give proper file format to upload");
  },
}).array("images", 10);

module.exports = {
  upload: upload,
  uploads: uploads,
};
