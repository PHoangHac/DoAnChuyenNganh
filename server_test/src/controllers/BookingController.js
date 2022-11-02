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
          {
            model: db.TourInfo,
            attributes: ["NameTour", "PricePerson"],
            // include: [
            //   {
            //     moodel: db.Location,
            //     attributes: ["country", "placeName", "descLocation"],
            //     where: { id: db.TourInfo.idLocation },
            //   },
            // ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(findBookingbyId);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetBookingByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const FindAll = await db.Booking.findAll({
        where: { idUser: id },
        include: [
          {
            model: db.TourInfo,
            attributes: ["NameTour", "PricePerson", "totalTime", "images"],
            include: [
              {
                model: db.Location,
                attributes: ["country", "placeName", "descLocation"],
              },
              {
                model: db.TypeOfTransport,
                attributes: ["nameTransport", "image"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(FindAll);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  DefaultPayment: async (req, res) => {
    try {
      // const data = req.body;
      // // console.log(data);
      const { id } = req.params;
      // const DPayment = await db.Booking.update({
      //   where: { id: id },
      //   Status: data.Status,
      //   returning: true,
      // });
      // // return res.status(200).json({ me: "success !" });
      // return res.status(200).json(DPayment);

      const User = await db.Booking.findOne({
        where: { id: id },
      });
      if (User) {
        User.Status = req.body.Status;
        await User.save();
      }
      return res.status(200).json({ msg: "success !" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  AllBookingPaymentSuccess: async (req, res) => {
    try {
      const { id } = req.params;
      const FindAll = await db.Booking.findAll({
        where: { idUser: id, Status: 1 },
        include: [
          {
            model: db.TourInfo,
            attributes: ["NameTour", "PricePerson", "totalTime", "images"],
            include: [
              {
                model: db.Location,
                attributes: ["country", "placeName", "descLocation"],
              },
              {
                model: db.TypeOfTransport,
                attributes: ["nameTransport", "image"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(FindAll);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default BookingController;
