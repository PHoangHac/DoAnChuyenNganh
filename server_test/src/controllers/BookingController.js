import db from "../models/index.js";
import Sequelize from "sequelize";
// import service
import BookingService from "../services/BookingService";

const BookingController = {
  CreateBooking: async (req, res) => {
    let data = req.body;
    try {
      if (!data.Adult == 0) {
        const booking = await db.Booking.create({
          Adult: data.Adult,
          Children: data.Children,
          AdultTotalCost: data.AdultTotalCost,
          ChildrenTotalCost: data.ChildrenTotalCost,
          StartedDay: data.StartedDay,
          totalCost: data.totalCost,
          totalGuest: data.totalGuest,
          Status: data.Status,
          idUser: data.idUser,
          idTourInfo: data.idTourInfo,
        });
        return res.status(200).send(booking);
      } else {
        return res.status(400).send({ msg: "Required More than 1 Adult !" });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
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
        where: { idUser: id, Status: "Default" || "Online" },
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
    } catch (error) {}
  },
  AllBookingWithDone: async (req, res) => {
    try {
      const FindAll = await db.Booking.findAll({
        where: { Status: "Default" || "Online" },
        raw: true,
        nest: true,
      });
      return res.status(200).json(FindAll);
    } catch (error) {}
  },
  DeleteBooking: async (req, res) => {
    const { id, idUser } = req.params;
    try {
      const FindOne = await db.Booking.findOne({
        where: { id: id, idUser: idUser },
      });
      if (FindOne) {
        FindOne.destroy();
        return res.status(200).json({ msg: "Delete SuccessFull !" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default BookingController;
