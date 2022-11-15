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
  UpdateOneTour: async (req, res) => {
    const { id } = req.params;
    try {
      const findOneTour = await db.TourInfo.findOne({
        where: { id: id },
      });
      if (findOneTour) {
        findOneTour.NameTour = req.body.NameTour;
        findOneTour.abbreviation = req.body.abbreviation;
        findOneTour.totalTime = req.body.totalTime;
        findOneTour.PricePerson = req.body.PricePerson;
        findOneTour.Description = req.body.Description;
        await findOneTour.save();
        return res.status(200).json({ msg: "Update Success !" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  DeleteTour: async (req, res) => {
    const { id } = req.params;
    try {
      const FindOneTour = await db.TourInfo.findOne({
        where: { id: id },
      });
      if (FindOneTour) {
        FindOneTour.destroy();
        return res.status(200).json({ msg: "Delete Success !" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  QueryParams: async (req, res) => {
    const query = req.query;
    try {
      const findOneTour = await db.TourInfo.findAll({
        include: [
          { model: db.TypeOfTransport, attributes: ["nameTransport"] },
          { model: db.Hotel, attributes: ["NameHotel"] },
          {
            model: db.Location,
            attributes: ["country", "placeName", "descLocation"],
            where: query,
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(findOneTour);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateTourImage: async (req, res) => {
    const { id } = req.params;
    let filenames = req.files.map(function (file) {
      return file.path; // or file.originalname
    });
    try {
      const findOneTour = await db.TourInfo.findOne({
        where: { id: id },
      });
      if (findOneTour) {
        (findOneTour.images = filenames), await findOneTour.save();
        return res.status(200).json({ msg: "Update Success !" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default TourController;
