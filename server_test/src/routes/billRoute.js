import express from "express";
import BillController from "../controllers/BillController";

let router = express.Router();

let BillRoute = (app) => {
  router
    .post("/Create", BillController.CreateBill)
    .get("/GetOneBill/:id", BillController.GetIdBill)
    .get("/GetAll", BillController.GetAllBill);

  return app.use("/Bill", router);
};

module.exports = BillRoute;
