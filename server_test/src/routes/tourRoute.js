import express from "express";
import TourController from "../controllers/TourController.js";
import UploadController from "../controllers/UploadFile.js";
// const passport = require("passport");
// const passportConfig = require("../middlewares/passport.js");

let router = express.Router();

let TourRoute = (app) => {
  router
    .post("/Create", UploadController.uploads, TourController.CreateTour)
    .get("/GetAll", TourController.GetAllTour)
    // .post("/GetIdTour", TourController.GetIdTour)
    .get("/GetIdTour2/:id", TourController.GetIdTour2);
  // .post("/GetAll", authController.signin)
  // .get(
  //   "/",
  // //   passport.authenticate("jwt", { session: false }),
  //   authController.DisplayAllUser
  // )
  // .post("/LogOut", authController.Logout);

  return app.use("/tour", router);
};

module.exports = TourRoute;