// import service
import db from "../models/index.js";

const BillController = {
  CreateBill: async (req, res) => {
    const data = req.body;
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    try {
      const CreateBill = await db.Bill.create({
        DatePayment: date,
        TimePayment: time,
        idUser: data.idUser,
        idBooking: data.idBooking,
      });
      return res.status(200).json(CreateBill);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetIdBill: async (req, res) => {
    try {
      const { id } = req.params;
      const findBillById = await db.Bill.findOne({
        attributes: ["id", "DatePayment", "TimePayment", "idUser", "idBooking"],
        where: { id: id },
        include: [
          { model: db.User, attributes: ["name", "phone"] },
          {
            model: db.Booking,
            attributes: ["id", "totalCost", "totalGuest"],
            include: [
              {
                model: db.TourInfo,
                attributes: ["NameTour"],
                include: [
                  { model: db.Location, attributes: ["country", "placeName"] },
                ],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(findBillById);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllBill: async (req, res) => {
    try {
      const AllBill = await db.Bill.findAll({
        raw: true,
      });
      return res.status(200).json(AllBill);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default BillController;
