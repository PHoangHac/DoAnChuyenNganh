import express from "express";
import PayPalController from "../controllers/PayPalController.js";
let router = express.Router();

function middleware1(req, res, next) {
  // Set data
  req.dataFromMiddleware1 = "Data of Middleware 1";
  // Go to next middleware
  next();
}

function middleware2(req, res, next) {
  console.log("We are in Middleware 2.");

  // Get Data of Middleware1
  console.log(req.dataFromMiddleware1);

  // Go to next middleware
  next();
}

let PayPalRoute = (app) => {
  router.get("/home", PayPalController.ChooseMethod);
  router.get("/paypal", PayPalController.Payment);
  router.get("/success", PayPalController.PaymentSuccess);
  router.get(
    "/cancel",
    middleware1,
    middleware2,
    PayPalController.PaymentCancel
  );

  return app.use("/PayPal", router);
};

module.exports = PayPalRoute;
