import express from "express";
import TransportController from "../controllers/TransportController";
import UploadController from "../controllers/UploadFile.js";
// const passport = require("passport");
// const passportConfig = require("../middlewares/passport.js");

let router = express.Router();

let TransportRoute = (app) => {
  router
    .post(
      "/Create",
      UploadController.upload,
      TransportController.CreateTransport
    )
    .get("/GetAll", TransportController.GetAllTransport);
  // .post("/GetAll", authController.signin)
  // .get(
  //   "/",
  // //   passport.authenticate("jwt", { session: false }),
  //   authController.DisplayAllUser
  // )
  // .post("/LogOut", authController.Logout);

  return app.use("/transport", router);
};

module.exports = TransportRoute;
