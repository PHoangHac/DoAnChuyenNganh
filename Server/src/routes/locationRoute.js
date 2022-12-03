import express from "express";
import LocationController from "../controllers/LocationController.js";
// const passport = require("passport");
// const passportConfig = require("../middlewares/passport.js");

let router = express.Router();

let LocationRoute = (app) => {
  router
    .post("/Create", LocationController.CreateLocation)
    .get("/GetAll", LocationController.GetAllLocation);

  return app.use("/location", router);
};

module.exports = LocationRoute;
