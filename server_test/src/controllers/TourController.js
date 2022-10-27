// import service
import db from "../models/index.js";
import TourService from "../services/TourService.js";

const TourController = {
  CreateTour: async (req, res) => {
    let data = req.body;
    let filenames = req.files.map(function (file) {
      return file.path; // or file.originalname
    });
    console.log(filenames);
    // let imageData = JSON.stringify(filenames);
    // console.log(typeof imageData);
    let tourData = await TourService.CreateTour(data, filenames);
    return res.status(200).json({
      errCode: tourData.errCode,
      message: tourData.errMessage,
    });
  },
  // GetIdTour: async (req, res) => {
  //   // // let idTour = req.params.id;
  //   // let idTour = req.body;
  //   // let tourData = await TourService.GetById(idTour);
  //   // // return res.status(200).send(data);
  //   // return res.status(200).json({
  //   //   errCode: tourData.errCode,
  //   //   message: tourData.errMessage,
  //   //   message: tourData.GetIdTour,
  //   // });

  //   try {
  //     // let idTour = req.params.id;
  //     let GetIdTour = await db.TourInfo.findOne({
  //       attributes: [
  //         "id",
  //         "NameTour",
  //         "abbreviation",
  //         "totalTime",
  //         "Departureday",
  //         "Description",
  //         "PricePerson",
  //         "images",
  //       ],
  //       where: { id: req.params.id },
  //       include: [
  //         { model: db.TypeOfTransport, attributes: ["NameHotel"] },
  //         { model: db.Hotel, attributes: ["nameTransport"] },
  //       ],
  //       raw: true,
  //     });
  //     return res.status(200).json(GetIdTour);
  //   } catch (error) {
  //     return res.status(200).json(error);
  //   }
  // },
  // USE POST METHOD
  // GetIdTour: async (req, res) => {
  //   let getInfo = req.body;
  //   if (!getInfo.id) {
  //     return res.status(500).json({
  //       errCode: 0,
  //       TourInfo: "Chua Truyen id de tim tour!!",
  //     });
  //   } else {
  //     let info = await TourService.FindTour(getInfo);
  //     return res.status(200).json({
  //       errCode: info.errCode,
  //       TourInfo: info.errMessage,
  //     });
  //   }
  // },
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
