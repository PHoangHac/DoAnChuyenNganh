import express from "express";
import homecontroller from "../controllers/homecontroller";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homecontroller.getHomePage);

  router.get("/about", homecontroller.getAboutPage);

  router.get("/CRUD", homecontroller.getCRUD);

  router.post("/post-crud", homecontroller.upload, homecontroller.postCRUD);

  router.get("/get-crud", homecontroller.displaysetCRUD);

  router.get("/edit-crud", homecontroller.getEditCRUD);

  router.post("/put-crud", homecontroller.putCRUD);

  router.get("/delete-crud", homecontroller.getDeleteCRUD);

  router
    .post(
      "/speciatly-crud",
      homecontroller.uploads,
      homecontroller.speciatlyCRUD
    )
    .get("/getAllSpeciatly", homecontroller.displayspeciatlyCRUD);

  return app.use("/", router);
};

module.exports = initWebRoutes;
