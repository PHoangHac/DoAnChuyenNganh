import express from "express";
import PayPalController from "../controllers/PayPalController.js";
let router = express.Router();

let PayPalRoute = (app) => {
  router.get("/home", PayPalController.ChooseMethod);
  router.get("/paypal", PayPalController.Payment);
  router.get("/success", PayPalController.PaymentSuccess);
  router.get("/cancel", PayPalController.PaymentCancel);

  return app.use("/PayPal", router);
};

module.exports = PayPalRoute;
