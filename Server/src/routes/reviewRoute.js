import express from "express";
import ReviewController from "../controllers/ReviewController";

let router = express.Router();

let ReviewRoute = (app) => {
  router
    .post("/Create", ReviewController.CreateReview)
    .get("/GetAll", ReviewController.GetAllReview)
    .get("/GetAllByTour/:idTour", ReviewController.GetAllReviewByTour)
    .get("/GetNewReview/:idTour", ReviewController.GetOneNewReview)
    .post("/CheckReview", ReviewController.CheckUserReview)
    .get("/GetOneCheckReview/:id", ReviewController.GetOneCheck)
    .post("/StopCheckReview/:id", ReviewController.StopUserReview);

  return app.use("/Review", router);
};

module.exports = ReviewRoute;
