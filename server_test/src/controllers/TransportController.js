// import service
import TransportService from "../services/TransportService";

const TransportController = {
  CreateTransport: async (req, res) => {
    let data = req.body;
    let imageData = req.file.path;
    let transportData = await TransportService.CreateTransPort(data, imageData);
    return res.status(200).json({
      errCode: transportData.errCode,
      message: transportData.errMessage,
    });
  },
  GetAllTransport: async (req, res) => {
    let data = await TransportService.GetAll();
    return res.status(200).send(data);
  },
};

export default TransportController;
