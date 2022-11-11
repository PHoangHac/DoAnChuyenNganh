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
    .get("/GetIdTour2/:id", TourController.GetIdTour2)
    .post("/UpdateTour/:id", TourController.UpdateOneTour)
    .delete("/DeleteTour/:id", TourController.DeleteTour)
    .get("/FindWithCon", TourController.QueryParams);

  return app.use("/tour", router);
};

module.exports = TourRoute;
