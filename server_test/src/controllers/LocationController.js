// import service
import LocationService from "../services/LocationService.js";

const LocationController = {
  CreateLocation: async (req, res) => {
    let data = req.body;
    console.log(data);
    let locationData = await LocationService.CreateLocation(data);
    return res.status(200).json({
      errCode: locationData.errCode,
      message: locationData.errMessage,
      message: locationData.location,
    });
  },
  GetAllLocation: async (req, res) => {
    let data = await LocationService.GetAll();
    return res.status(200).send(data);
  },
};

export default LocationController;
