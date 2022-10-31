import express from "express";
import BookingController from "../controllers/BookingController.js";

let router = express.Router();

let HotelRoute = (app) => {
  router
    .post("/Create", BookingController.CreateBooking)
    .get("/DetailsBooking/:id", BookingController.GetIdBooking2)
    .get("/GetAll", BookingController.GetAllBooking)
    .get("/GetAllBookingUser/:id", BookingController.GetBookingByUser)
    .put("/DefaultPayment/:id", BookingController.DefaultPayment);
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
