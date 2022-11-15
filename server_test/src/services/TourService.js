import db from "../models/index";

const TourService = {
  CreateTour: (data, imageData) => {
    return new Promise(async (resolve, rejct) => {
      try {
        const tourData = {};

        // validate
        if (
          !data.NameTour == "" ||
          !data.location == "" ||
          !data.totalTime == "" ||
          !data.PricePerson == "" ||
          !data.Description == "" ||
          !data.Departureday == "" ||
          data.PricePerson == ""
        ) {
          let Tour = await db.TourInfo.create({
            NameTour: data.NameTour,
            abbreviation: data.abbreviation, // Viết tắt
            totalTime: data.totalTime, // Tổng thời gian
            Departureday: data.Departureday, // Thời gian khởi hành
            Description: data.Description,
            PricePerson: data.PricePerson,
            images: imageData,
            idTypesOfTransport: data.idTypesOfTransport,
            idHotel: data.idHotel,
            idLocation: data.idLocation,
          });
          tourData.errCode = 0;
          tourData.errMessage = "Create Tour successfully !";
          tourData.Tour = Tour;
        } else {
          tourData.errCode = 1;
          tourData.errMessage = "Some Field is empty !";
        }

        resolve(tourData);
      } catch (e) {
        rejct(e);
      }
    });
  },
  GetById: (idTour) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tourData = {};

        let GetIdTour = await db.TourInfo.findOne({
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
          where: { id: idTour.id },
          include: [
            { model: db.TypeOfTransport, attributes: ["NameHotel"] },
            { model: db.Hotel, attributes: ["nameTransport"] },
          ],
          raw: true,
          nest: true,
        });
        // check id tour
        // if (!GetIdTour == null || !GetIdTour == "") {
        tourData.errCode = 0;
        tourData.errMessage = "Success !";
        tourData.GetById = GetIdTour;
        // } else {
        //   tourData.errCode = 1;
        //   tourData.errMessage = "Can't find this id is system !";
        // }
      } catch (error) {}
    });
  },
  GetAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let allHotel = db.TourInfo.findAll({
          include: [
            { model: db.TypeOfTransport, attributes: ["nameTransport"] },
            { model: db.Hotel, attributes: ["NameHotel"] },
            {
              model: db.Review,
              attributes: ["comment", "rating", "Status", "idUser"],
            },
            {
              model: db.Location,
              attributes: ["country", "placeName", "descLocation"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve(allHotel);
      } catch (e) {
        reject(e);
      }
    });
  },
  //////////////////Find 1 by id Tour
  // FindTour: (getInfo) => {
  //   return new Promise(async (resolve, rejct) => {
  //     let RData = {};
  //     let data = await db.TourInfo.findOne({
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
  //       where: { id: getInfo.id },
  //       include: [
  //         { model: db.TypeOfTransport, attributes: ["nameTransport"] },
  //         { model: db.Hotel, attributes: ["NameHotel"] },
  //       ],
  //       raw: true,
  //       nest: true,
  //     });
  //     if (
  //       data == null ||
  //       data == "" ||
  //       data == undefined ||
  //       data == {} ||
  //       data == []
  //     ) {
  //       RData.errCode = 1;
  //       RData.errMessage = "Khong ton tai tour nay!!";
  //     } else {
  //       RData.errCode = 0;
  //       RData.errMessage = data;
  //     }

  //     resolve(RData);
  //   });
  // },
};

export default TourService;
