import db from "../models/index";
import CRUDService from "../services/CRUDService";

// images upload
import multer from "multer";
import path, { extname } from "path";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("home.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("about/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let data = req.body;
  let imageData = req.file.path;
  let message = await CRUDService.createNewUser(data, imageData);
  console.log(message);
  return res.send("post crud from server");
};

let displaysetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log('---------------------')
  // console.log(data);
  // console.log('---------------------')
  // return res.render('displayCRUD.ejs', {
  //     dataTable : data
  // });
  return res.status(200).send(data);
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  // console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    // console.log('-------------------')
    // console.log(userData)
    // console.log('-------------------')
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserdata(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let getDeleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("delete user success !");
  } else {
    return res.send("user not found !");
  }
};

// specialty

let speciatlyCRUD = async (req, res) => {
  try {
    let data = req.body;
    let filenames = req.files.map(function (file) {
      return file.path; // or file.originalname
    });

    // console.log(Object.entries(filenames));
    // console.log(filenames);
    // console.log(typeof filenames);

    // const reformattedArray = req.files.map(({ key, value }) => ({
    //   [key]: value,
    // }));
    // console.log(reformattedArray);

    // let names = filenames.map((item) => item.path);
    // console.log(names);
    // console.log(typeof names);

    // let jsonObject = JSON.parse(filenames);
    // console.log(jsonObject);

    let jsonarray = JSON.stringify(filenames);
    console.log(jsonarray);
    // console.log(typeof jsonarray);
    // let arrayimg = req.files;
    let speciatlyS = await db.Specialty.create({
      name: data.name,
      description: data.description,
      image: jsonarray,
    });
    return res.status(200).send(speciatlyS);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let displayspeciatlyCRUD = async (req, res) => {
  let data = await CRUDService.disAllplayspeciatlyCRUD();
  // console.log('---------------------')
  // console.log(data);
  // console.log('---------------------')
  // return res.render('displayCRUD.ejs', {
  //     dataTable : data
  // });
  return res.status(200).send({ speciatly: data });
};

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
}).array("image", 3);

// .array('images', 3)

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displaysetCRUD: displaysetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  getDeleteCRUD: getDeleteCRUD,
  upload: upload,
  uploads: uploads,
  speciatlyCRUD: speciatlyCRUD,
  displayspeciatlyCRUD: displayspeciatlyCRUD,
};
