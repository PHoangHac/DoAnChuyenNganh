// import service
import db from "../models/index.js";
import TourService from "../services/TourService.js";

const TourController = {
  CreateTour: async (req, res) => {
    let data = req.body;
    let filenames = req.files.map(function (file) {
      return file.path; // or file.originalname
    });
    // console.log(filenames);
    // let imageData = JSON.stringify(filenames);
    // console.log(typeof imageData);
    let tourData = await TourService.CreateTour(data, filenames);
    return res.status(200).json({
      errCode: tourData.errCode,
      message: tourData.errMessage,
    });
  },

  GetIdTour2: async (req, res) => {
    try {
      const { id } = req.params;
      // const findTourbyId = await db.TourInfo.findByPk(id);
      const findTourbyId = await db.TourInfo.findOne({
        attributes: [
          "id",
          "NameTour",
          "abbreviation",
          "totalTime",
          "Departureday",
          "Description",
          "PricePerson",
          "images",
        ],
        where: { id: id },
        include: [
          { model: db.TypeOfTransport, attributes: ["nameTransport"] },
          { model: db.Hotel, attributes: ["NameHotel"] },
          {
            model: db.Location,
            attributes: ["country", "descLocation", "placeName"],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(findTourbyId);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllTour: async (req, res) => {
    let data = await TourService.GetAll();
    return res.status(200).send(data);
  },
};

export default TourController;
