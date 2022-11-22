// import service
import TransportService from "../services/TransportService";
import db from "../models/index";

const TransportController = {
  CreateTransport: async (req, res) => {
    let data = req.body;

    let transportData = await TransportService.CreateTransPort(data);
    return res.status(200).json({
      errCode: transportData.errCode,
      message: transportData.errMessage,
    });
  },
  GetAllTransport: async (req, res) => {
    let data = await TransportService.GetAll();
    return res.status(200).send(data);
  },
  GetOne: async (req, res) => {
    const { id } = req.params;
    try {
      const FindOne = await db.TypeOfTransport.findOne({
        where: { id: id },
      });
      return res.status(200).send(FindOne);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

export default TransportController;
