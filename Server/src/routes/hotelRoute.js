import express from "express";
import HotelController from "../controllers/HotelController";
import UploadController from "../controllers/UploadFile.js";
// const passport = require("passport");
// const passportConfig = require("../middlewares/passport.js");

let router = express.Router();

let HotelRoute = (app) => {
  router
    .post("/Create", UploadController.uploads, HotelController.CreateHotel)
    .get("/GetAll", HotelController.GetAllHotel)
    .get("/GetOne/:id", HotelController.GetOneHotel);
  // .post("/GetAll", authController.signin)
  // .get(
  //   "/",
  // //   passport.authenticate("jwt", { session: false }),
  //   authController.DisplayAllUser
  // )
  // .post("/LogOut", authController.Logout);

  return app.use("/hotel", router);
};

module.exports = HotelRoute;
