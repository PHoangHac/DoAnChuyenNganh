// import service
import HotelService from "../services/HotelService.js";

const HotelController = {
  Createhotel: async (req, res) => {
    let data = req.body;
    let filenames = req.files.map(function (file) {
      return file.path; // or file.originalname
    });
    let imageData = JSON.stringify(filenames);
    let hotelData = await HotelService.CreateHotel(data, imageData);
    return res.status(200).json({
      errCode: hotelData.errCode,
      message: hotelData.errMessage,
    });
  },
  GetAllHotel: async (req, res) => {
    let data = await HotelService.GetAll();
    return res.status(200).send(data);
  },
};

export default HotelController;
