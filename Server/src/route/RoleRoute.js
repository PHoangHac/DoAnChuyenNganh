import express from "express";
import roleController from "../controller/RoleController.js";

let router = express.Router();
const RoleRoute = (app) => {
  router.post("/RoleCreate", roleController.CreateRole);
  ///
  return app.use("/api/v1/", router);
};

export default RoleRoute;
//module.export = initWebRoute;
