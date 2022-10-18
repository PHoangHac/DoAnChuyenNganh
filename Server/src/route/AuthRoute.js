import express from "express";
import authController from "../controller/AuthController.js";
import AuthController from "../controller/AuthController.js";

const router = express.Router();
const AuthRoute = (app) => {
  router
    .post("/DangKy1", AuthController.Register)
    .post("/DangNhap", authController.Login);

  ///
  return app.use("/api/v1/", router);
};

export default AuthRoute;
//module.export = initWebRoute;
