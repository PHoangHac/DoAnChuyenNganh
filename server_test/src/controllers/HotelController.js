// import service
import HotelService from "../services/HotelService.js";
import db from "../models/index";

const HotelController = {
  CreateHotel: async (req, res) => {
    let data = req.body;
    // console.log(req.files);
    // let filenames = req.files.map(function (file) {
    //   return file.path; // or file.originalname
    // });
    // let imageData = JSON.stringify(filenames);
    let hotelData = await HotelService.CreateHotel(data);
    return res.status(200).json({
      errCode: hotelData.errCode,
      message: hotelData.errMessage,
      message: hotelData.hotel,
    });
  },
  GetAllHotel: async (req, res) => {
    let data = await HotelService.GetAll();
    return res.status(200).send(data);
  },
  GetOneHotel: async (req, res) => {
    const { id } = req.params;
    try {
      const OneHotel = await db.Hotel.findOne({
        where: { id: id },
      });
      return res.status(200).send(OneHotel);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

export default HotelController;
