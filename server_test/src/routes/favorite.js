import express from "express";
import FavoriteController from "../controllers/FavoriteController";

let router = express.Router();

let FavoriteRoute = (app) => {
  router
    .post("/Create", FavoriteController.CreateFavorite)
    .get("/GetAll", FavoriteController.GetAllFavorite)
    .get("/GetOne/:id", FavoriteController.GetOneFavorite)
    .get("/GetOne/:id/:idTour", FavoriteController.GetOneByTour)
    .post("/DisFAR/:id/:idTour", FavoriteController.UpDateFavorite)
    .get("/GetAllByUser/:id", FavoriteController.GetAllFavoriteByUser);

  return app.use("/Favorite", router);
};

module.exports = FavoriteRoute;
