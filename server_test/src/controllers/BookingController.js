import db from "../models/index.js";
import Sequelize from "sequelize";
// import service
import BookingService from "../services/BookingService";

const BookingController = {
  CreateBooking: async (req, res) => {
    let data = req.body;

    let bookingData = await BookingService.CreateBooking(data);
    return res.status(200).json({
      errCode: bookingData.errCode,
      message: bookingData.errMessage,
      message: bookingData.booking,
    });
  },
  GetAllBooking: async (req, res) => {
    let data = await BookingService.GetAll();
    return res.status(200).send(data);
  },
  GetIdBooking2: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log({ id });
      // const findTourbyId = await db.TourInfo.findByPk(id);
      const findBookingbyId = await db.Booking.findOne({
        attributes: [
          "id",
          "Adult",
          "Children",
          "Status",
          [
            Sequelize.fn(
              "SUM",
              Sequelize.where(
                Sequelize.col("Adult"),
                "+",
                Sequelize.col("Children")
              )
            ),
            "totalGuest",
          ],
        ],
        where: { id: id },
        group: ["id", "Adult", "Children", "Status"],
        include: [
          { model: db.User, attributes: ["name", "email", "phone"] },
          { model: db.TourInfo, attributes: ["NameTour"] },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(findBookingbyId);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default BookingController;
