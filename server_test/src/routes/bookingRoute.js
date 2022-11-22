import express from "express";
import BookingController from "../controllers/BookingController.js";
const passport = require("passport");

let router = express.Router();

let HotelRoute = (app) => {
  router
    .post(
      "/Create",

      BookingController.CreateBooking
    )
    .get("/DetailsBooking/:id", BookingController.GetIdBooking2)
    .get("/GetAll", BookingController.GetAllBooking)
    .get("/GetAllBookingUser/:id", BookingController.GetBookingByUser)
    .put("/DefaultPayment/:id", BookingController.DefaultPayment)
    .get("/PaymentSuccess/:id", BookingController.AllBookingPaymentSuccess)
    .delete("/DeleteByUser/:id/:idUser", BookingController.DeleteBooking)
    .get("/AllWithSuccess", BookingController.AllBookingWithDone);
  // .post("/GetAll", authController.signin)
  // .get(
  //   "/",
  // //   passport.authenticate("jwt", { session: false }),
  //   authController.DisplayAllUser
  // )
  // .post("/LogOut", authController.Logout);

  return app.use("/booking", router);
};

module.exports = HotelRoute;
