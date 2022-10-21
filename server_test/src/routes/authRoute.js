import express from "express";
import authController from "../controllers/AuthController.js";
const passport = require("passport");
const passportConfig = require("../middlewares/passport.js");

let router = express.Router();

let AuthRoutes = (app) => {
  router
    .post("/SignUp", authController.registerUser)
    .post("/SignIn", authController.signin)
    .get(
      "/",
      passport.authenticate("jwt", { session: false }),
      authController.DisplayAllUser
    )
    .post("/LogOut", authController.Logout);

  return app.use("/auth", router);
};

module.exports = AuthRoutes;
