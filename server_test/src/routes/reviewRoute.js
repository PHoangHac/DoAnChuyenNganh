import express from "express";
import ReviewController from "../controllers/ReviewController";

let router = express.Router();

let ReviewRoute = (app) => {
  router
    // .post("/Create", BillController.CreateBill)
    // .get("/GetOneBill/:id", BillController.GetIdBill)
    .get("/GetAll", ReviewController.GetAllReview);

  return app.use("/Review", router);
};

module.exports = ReviewRoute;
